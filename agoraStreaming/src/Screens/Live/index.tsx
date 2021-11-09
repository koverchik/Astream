import React, {FC, useEffect, useRef, useState} from 'react';
import {Platform, View} from 'react-native';
import {styles} from './style';
import RtcEngine, {
  ChannelProfile,
  ClientRole,
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
} from 'react-native-agora';
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
import {MicroMutedSvg} from '../../Icons/MicroMutedSvg';
import {CameraMutedSvg} from '../../Icons/CameraMutedSvg';
import {Preloader} from '../../Components/Preloader/Preloader';
import {MuteIcon} from '../../Components/MuteIcon/MuteIcon';

export const Live: FC<LiveScreenProps> = (props) => {
  const {channelId, name, coords} = props.route.params;

  const [joined, setJoined] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [peerIds, setPeerIds] = useState<UserType[]>([]);
  const [userName, setUserName] = useState<string>('');
  const [muteCamera, setMuteCamera] = useState<boolean>(false);
  const [muteVoice, setMuteVoice] = useState<boolean>(false);

  const appID = 'fecf7537eab9494b9612e782053cc546';

  const isBroadcaster = isBroadcasterFunction(props.route.params.type);

  const AgoraEngine = useRef<RtcEngine>();

  const newReference = database().ref('/channels').push();

  const navigation = useNavigation<StackNavigationPropNavigation>();

  const goHome = () => navigation.navigate('Home');

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

  const mute = (settings: MuteSettingsType, data: UserType[]) => {
    return data.map((userData) => {
      if (userData.uid === settings.uid) {
        return {...userData, [settings.device]: settings.muted};
      } else {
        return userData;
      }
    });
  };

  const init = async () => {
    AgoraEngine.current = await RtcEngine.create(appID);

    AgoraEngine.current?.enableVideo();

    AgoraEngine.current?.setChannelProfile(ChannelProfile.LiveBroadcasting);

    AgoraEngine.current?.setClientRole(ClientRole.Broadcaster);

    AgoraEngine.current?.addListener('JoinChannelSuccess', () => {
      changeStateChannel();
    });

    AgoraEngine.current?.addListener('LocalUserRegistered', (uid, userInfo) => {
      setUserName(userInfo);
    });

    AgoraEngine.current?.addListener('UserInfoUpdated', (uid, userInfo) => {
      if (!peerIds.find((userData) => userData.uid === uid)) {
        const user: UserType = {
          ...userInfo,
          camera: false,
          voice: false,
        };
        setPeerIds((prev) => [...prev, user]);
      }
    });

    AgoraEngine.current?.addListener('UserOffline', (uid) => {
      setPeerIds((prev) => prev.filter((userData) => userData.uid !== uid));
    });

    AgoraEngine.current?.addListener('LeaveChannel', (StatsCallback) => {
      StatsCallback.userCount === 1 ? userLeaveChannel() : null;
      AgoraEngine.current?.destroy();
    });

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
    return <Preloader />;
  }

  return (
    <View style={styles.container}>
      {joined && (
        <View style={styles.camera}>
          {muteCamera ? (
            <View style={[styles.muteCamera, styles.camera]}>
              <CameraMutedSvg fill={'#262626'} size={'50%'} />
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
          <View style={styles.camera} key={user.uid}>
            {user.camera ? (
              <View style={[styles.muteCamera, styles.camera]}>
                <CameraMutedSvg fill={'#262626'} size={'50%'} />
              </View>
            ) : (
              <RtcRemoteView.SurfaceView
                style={styles.camera}
                uid={user.uid}
                channelId={channelId}
                renderMode={VideoRenderMode.Hidden}
                zOrderMediaOverlay={true}
              />
            )}
            <View style={styles.userNameContainer}>
              <UserNameLabel userName={user.userAccount} />
              <View style={styles.iconContainer}>
                {user.voice && <MuteIcon icon={MicroMutedSvg} />}
                {user.camera && <MuteIcon icon={CameraMutedSvg} />}
              </View>
            </View>
          </View>
        );
      })}
      <ButtonBar
        exitHandler={exitChannelHandler}
        cameraHandler={cameraHandler}
        microphoneHandler={microphoneHandler}
        switchCamera={switchCamera}
        muteCamera={muteCamera}
        muteVoice={muteVoice}
      />
    </View>
  );
};
