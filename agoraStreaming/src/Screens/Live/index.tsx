import React, {FC, useEffect, useRef, useState} from 'react';
import {Animated, Platform, View} from 'react-native';
import {styles} from './style';
import RtcEngine, {RtcLocalView, UserInfo} from 'react-native-agora';
import {isBroadcasterFunction} from './helpers/isBroadcaster';
import {LiveScreenProps, MuteSettingsType, UserType} from './types';
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
import {Preloader} from '../../Components/Preloader/Preloader';
import {animationCircle} from './helpers/animationCircle';
import {initChannel} from './helpers/channel';
import {ListUsers} from '../../Components/ListUsers';
import {hiddenUsers} from './fakeData';
import {UserInfoCallback} from 'react-native-agora/lib/typescript/src/common/RtcEvents';
import {callbackFunctionAudioVolumeIndication} from './helpers/callbackFunctionAudioVolumeIndication';
import {switchCamera} from './helpers/switchCamera';
import {exitChannelHandler} from './helpers/exitChannelHandler';

export const Live: FC<LiveScreenProps> = (props) => {
  const {channelId, name, coords} = props.route.params;

  const [joined, setJoined] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
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

  animationCircle(sizeUserPoint, wavesAroundUserPoint).start();

  const userJoined = () => {
    setJoined(true);
  };

  const callbackFunctionUserOffline = (uid: number) => {
    setPeerIds((prev) => prev.filter((userData) => userData.uid !== uid));
  };
  const callbackUserMuteAudio = (uid: number, muted: boolean) => {
    setPeerIds((prevState) => {
      return mute({uid, muted, device: 'voice'}, prevState);
    });
  };
  const callbackFunctionLocalUserRegistered = (
    uid: number,
    userInfo: string,
  ) => {
    setUserName(userInfo);
  };

  const callbackFunctionUserInfoUpdated: UserInfoCallback = (uid, userInfo) => {
    if (!peerIds.find((userData) => userData.uid === uid)) {
      const user: UserType = {
        ...userInfo,
        camera: false,
        voice: false,
        activeVoice: false,
      };
      setPeerIds((prev) => [...prev, user]);
    }
  };
  const callbackFunctionUserMuteVideo = (uid: number, muted: boolean) => {
    setPeerIds((prevState) => {
      return mute({uid, muted, device: 'camera'}, prevState);
    });
  };

  const cameraHandler = () => {
    setMuteCamera((prev) => !prev);
    AgoraEngine.current?.muteLocalVideoStream(!muteCamera);
  };

  const microphoneHandler = () => {
    setMuteVoice((prev) => !prev);
    AgoraEngine.current?.muteLocalAudioStream(!muteVoice);
  };

  const mute = (settings: MuteSettingsType, data: UserType[]) => {
    return data.map((userData) => {
      if (userData.uid === settings.uid) {
        return {...userData, [settings.device]: settings.muted};
      } else {
        return userData;
      }
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
    initChannel(
      AgoraEngine,
      userJoined,
      userLeaveChannel,
      callbackFunctionUserOffline,
      callbackFunctionUserInfoUpdated,
      callbackFunctionUserMuteVideo,
      callbackUserMuteAudio,
      callbackFunctionLocalUserRegistered,
      callbackFunctionAudioVolumeIndication(activeVoiceSet, setPeerIds),
    )
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
    return <Preloader />;
  }
  const countUsers = () => {
    return peerIds.length + 1;
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapperVideoAndButton}>
        {joined && (
          <View style={styles.camera}>
            {muteCamera ? (
              <View style={[styles.muteCamera, styles.camera]}>
                {activeVoice && (
                  <IconUserName
                    userName={userName}
                    countUser={countUsers}
                    sizeUserPoint={sizeUserPoint}
                    wavesAroundUserPoint={wavesAroundUserPoint}
                  />
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
        <ButtonBar
          exitHandler={() => exitChannelHandler(AgoraEngine, navigation)}
          cameraHandler={cameraHandler}
          microphoneHandler={microphoneHandler}
          switchCamera={() => switchCamera(AgoraEngine)}
          muteCamera={muteCamera}
          muteVoice={muteVoice}
        />
      </View>
      <ListUsers hiddenUsers={hiddenUsers} />
    </View>
  );
};
