import React, {FC, useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Animated, Platform, Text, View} from 'react-native';
import {styles} from './style';
import RtcEngine, {
  ChannelProfile,
  ClientRole,
  RtcLocalView,
} from 'react-native-agora';
import {isBroadcasterFunction} from './helpers/isBroadcaster';
import {LiveScreenProps, MuteSettings, UserType} from './types';
import database from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationPropNavigation} from '../Home/types';
import {errorAlert} from './helpers/alert';
import {requestCameraAndAudioPermission} from './helpers/permission';
import {v4 as uuid} from 'uuid';
import {UserNameLabel} from '../../Components/UserNameLabel/UserNameLabel';
import {findKeyDataInDatabase} from './helpers/findKeyDataInDatabase';
import {deleteChannel} from './helpers/deleteChannel';
import {ButtonBar} from '../../Components/ButtonBar/ButtonBar';
import {RemoteUsers} from '../../Components/RemoteUsers';
import {IconUserName} from '../../Components/IconUserName';
import {CameraMutedSvg} from '../../Icons/CameraMutedSvg';

export const Live: FC<LiveScreenProps> = (props) => {
  const {channelId, name, coords} = props.route.params;

  const [joined, setJoined] = useState(false);
  const [error, setError] = useState(false);
  const [peerIds, setPeerIds] = useState<UserType[]>([]);
  const [userName, setUserName] = useState<string>('');
  const [muteCamera, setMuteCamera] = useState<boolean>(false);
  const [muteVoice, setMuteVoice] = useState<boolean>(false);
  const [activeVoice, activeVoiceSet] = useState(false);

  const isBroadcaster = isBroadcasterFunction(props.route.params.type);

  const AgoraEngine = useRef<RtcEngine>();

  const newReference = database().ref('/channels').push();

  const navigation = useNavigation<StackNavigationPropNavigation>();

  const goHome = () => navigation.navigate('Home');

  const sizeUserPoint = useRef(new Animated.Value(5)).current;
  const wavesAroundUserPoint = useRef(new Animated.Value(3)).current;

  const animation = useRef(
    Animated.loop(
      Animated.parallel([
        Animated.spring(sizeUserPoint, {
          toValue: 3,
          useNativeDriver: true,
          stiffness: 10,
        }),
        Animated.spring(wavesAroundUserPoint, {
          toValue: 5,
          useNativeDriver: true,
          stiffness: 10,
        }),
      ]),
      {iterations: 100000},
    ),
  ).current;

  const changeStateChannel = () => {
    setJoined(true);
  };

  const exitChannelHandler = () => {
    AgoraEngine.current?.leaveChannel();
    navigation.goBack();
  };

  const cameraHandler = () => {
    setMuteCamera((prev) => !prev);
    AgoraEngine.current?.muteLocalVideoStream(!muteCamera);
  };

  const microphoneHandler = () => {
    setMuteVoice((prev) => !prev);

    AgoraEngine.current?.muteLocalAudioStream(!muteVoice);
  };

  const switchCamera = () => {
    AgoraEngine.current?.switchCamera();
  };

  const init = async () => {
    AgoraEngine.current = await RtcEngine.create(
      'fecf7537eab9494b9612e782053cc546',
    );
    AgoraEngine.current.enableVideo();
    AgoraEngine.current.setChannelProfile(ChannelProfile.LiveBroadcasting);

    AgoraEngine.current.setClientRole(ClientRole.Broadcaster);

    AgoraEngine.current.enableAudioVolumeIndication(200, 10, true);

    AgoraEngine.current.addListener('JoinChannelSuccess', () => {
      changeStateChannel();
    });

    AgoraEngine.current.addListener('LocalUserRegistered', (uid, userInfo) => {
      setUserName(userInfo);
    });

    AgoraEngine.current.addListener('UserInfoUpdated', (uid, userInfo) => {
      if (!peerIds.find((userData) => userData.uid === uid)) {
        const user: UserType = {
          ...userInfo,
          camera: false,
          voice: false,
          activeVoice: false,
        };
        setPeerIds((prev) => [...prev, user]);
      }
    });
    AgoraEngine.current.addListener('AudioVolumeIndication', (speakers) => {
      for (let i = 0; i < speakers.length; i++) {
        const speaker = speakers[i];
        console.log(speaker);
        console.log(speaker['uid']);

        if (speaker['volume']) {
          if (
            speaker['volume'] > 0 &&
            speaker['uid'] === 0 &&
            activeVoice == false
          ) {
            activeVoiceSet(true);
            animation.start();
          }

          setPeerIds((prev) => {
            return prev.map((user) => {
              if (user.uid === speaker.uid) {
                return {
                  ...user,
                  activeVoice: true,
                };
              } else {
                return {
                  ...user,
                  activeVoice: false,
                };
              }
            });
          });
        }
      }
    });

    AgoraEngine.current.addListener('UserOffline', (uid) => {
      setPeerIds((prev) => prev.filter((userData) => userData.uid !== uid));
    });

    AgoraEngine.current?.addListener('LeaveChannel', (StatsCallback) => {
      StatsCallback.userCount === 1 ? userLeaveChannel() : null;
      AgoraEngine.current?.destroy();
    });

    const mute = (settings: MuteSettings, data: UserType[]) => {
      return data.map((userData) => {
        if (userData.uid === settings.uid) {
          return {...userData, [settings.device]: settings.muted};
        } else {
          return userData;
        }
      });
    };

    AgoraEngine.current?.addListener('UserMuteVideo', (uid, muted) => {
      setPeerIds((prevState) => {
        return mute({uid, muted, device: 'camera'}, prevState);
      });
    });

    AgoraEngine.current?.addListener('UserMuteAudio', (uid, muted) => {
      setPeerIds((prevState) => {
        return mute({uid, muted, device: 'voice'}, prevState);
      });
    });
  };

  const addNewChannelInDB = async () => {
    await newReference.set({
      name,
      channelId,
      coords,
    });
  };

  const userLeaveChannel = async () => {
    const keyChannel = await findKeyDataInDatabase(channelId);
    if (keyChannel) {
      await deleteChannel(keyChannel);
    }
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestCameraAndAudioPermission();
    }

    init()
      .then(() => {
        AgoraEngine.current?.joinChannelWithUserAccount(
          null,
          channelId,
          uuid(),
        );
        isBroadcaster ? addNewChannelInDB() : null;
      })
      .catch((e) => {
        setError(true);
        errorAlert(e.message, goHome);
      });

    return () => {
      AgoraEngine.current?.leaveChannel();
    };
  }, []);

  if (!error && !joined) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={60} color="#222" />
        <Text style={styles.loadingText}>Joining Stream, Please Wait</Text>
      </View>
    );
  }
  const countUsers = () => {
    return peerIds.length + 1;
  };
  return (
    <View style={styles.container}>
      {joined && (
        <View style={styles.camera}>
          {muteCamera ? (
            <View style={[styles.muteCamera, styles.camera]}>
              {activeVoice ? (
                <IconUserName
                  userName={userName}
                  countUser={countUsers}
                  sizeUserPoint={sizeUserPoint}
                  wavesAroundUserPoint={wavesAroundUserPoint}
                />
              ) : (
                <CameraMutedSvg fill={'#262626'} size={'50%'} />
              )}
            </View>
          ) : (
            <RtcLocalView.SurfaceView
              style={styles.camera}
              channelId={channelId}
            />
          )}
          <View style={styles.userNameContainer}>
            <UserNameLabel userName={userName} />
          </View>
          <ButtonBar
            exitHandler={exitChannelHandler}
            cameraHandler={cameraHandler}
            microphoneHandler={microphoneHandler}
            switchCamera={switchCamera}
            muteCamera={muteCamera}
            muteVoice={muteVoice}
          />
        </View>
      )}
      {peerIds.map((user) => {
        return (
          <RemoteUsers
            key={'RemoteUsers' + user.uid}
            uid={user.uid}
            channelId={channelId}
            countUsers={countUsers}
            userAccount={user.userAccount}
            voice={user.voice}
            camera={user.camera}
            activeVoice={user.activeVoice}
          />
        );
      })}
    </View>
  );
};
