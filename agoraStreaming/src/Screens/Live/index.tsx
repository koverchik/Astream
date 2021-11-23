import database from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/native';
import React, {FC, useEffect, useRef, useState} from 'react';
import {Animated, Platform, View} from 'react-native';
import RtcEngine from 'react-native-agora';
import {UserInfoCallback} from 'react-native-agora/lib/typescript/src/common/RtcEvents';
import {v4 as uuid} from 'uuid';

import {ButtonBar} from '../../Components/ButtonBar/ButtonBar';
import {ListUsers} from '../../Components/ListUsers';
import {LocalUser} from '../../Components/LocalUser';
import {Preloader} from '../../Components/Preloader/Preloader';
import {RemoteUsers} from '../../Components/RemoteUsers';
import {LocalUserType} from '../../Components/RemoteUsers/types';
import {StackNavigationPropNavigation} from '../Home/types';
import {hiddenUsers} from './fakeData';
import {cameraStyle} from './helpers/CameraStyle';
import {errorAlert} from './helpers/alert';
import {animationCircle} from './helpers/animationCircle';
import {callbackFunctionAudioVolumeIndication} from './helpers/callbackFunctionAudioVolumeIndication';
import {initChannel} from './helpers/channel';
import {deleteChannel} from './helpers/deleteChannel';
import {exitChannelHandler} from './helpers/exitChannelHandler';
import {findKeyDataInDatabase} from './helpers/findKeyDataInDatabase';
import {isBroadcasterFunction} from './helpers/isBroadcaster';
import {requestCameraAndAudioPermission} from './helpers/permission';
import {switchCamera} from './helpers/switchCamera';
import {styles} from './style';
import {LiveScreenProps, MuteSettingsType, UserType} from './types';

export const Live: FC<LiveScreenProps> = (props) => {
  const {channelId, name, coords, isVideo} = props.route.params;

  const [joined, setJoined] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [peerIds, setPeerIds] = useState<UserType[]>([]);
  const [myUserData, setMyUserData] = useState<LocalUserType>({
    uid: 0,
    userAccount: '',
    camera: false,
    voice: false,
    activeVoice: false,
  });

  const [stash, setStash] = useState<UserType[]>([]);

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
    setStash((prev) => prev.filter((userData) => userData.uid !== uid));
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
    setMyUserData((prev) => ({
      ...prev,
      uid: uid,
      userAccount: userInfo,
    }));
    const user: UserType = {
      uid: uid,
      userAccount: userInfo,
      camera: false,
      voice: false,
      activeVoice: false,
    };
    setPeerIds((prev) => {
      if (prev.length < 4) {
        return [...prev, user];
      } else {
        setStash((prevStash) => [...prevStash, user]);
        return prev;
      }
    });
  };

  const callbackFunctionUserInfoUpdated: UserInfoCallback = (uid, userInfo) => {
    if (!peerIds.find((userData) => userData.uid === uid)) {
      const user: UserType = {
        ...userInfo,
        camera: false,
        voice: false,
        activeVoice: false,
      };
      setPeerIds((prev) => {
        if (prev.length < 4) {
          return [...prev, user];
        } else {
          setStash((prevStash) => [...prevStash, user]);
          return prev;
        }
      });
    }
  };

  const callbackFunctionUserMuteVideo = (uid: number, muted: boolean) => {
    setPeerIds((prevState) => {
      return mute({uid, muted, device: 'camera'}, prevState);
    });
  };

  const cameraHandler = () => {
    setMyUserData((prev) => ({...prev, camera: !prev.camera}));
    AgoraEngine.current?.muteLocalVideoStream(!myUserData.camera);
  };

  const microphoneHandler = () => {
    setMyUserData((prev) => ({...prev, voice: !prev.voice}));
    AgoraEngine.current?.muteLocalAudioStream(!myUserData.voice);
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
      isVideo: isVideo,
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
      callbackFunctionAudioVolumeIndication(setMyUserData, setPeerIds),
      isVideo,
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
      <View style={[styles.videoContainer, peerIds.length === 3 && styles.row]}>
        <View style={peerIds.length === 2 ? styles.column : styles.row}>
          {peerIds.map((user, index, ids) => {
            if (user.uid !== myUserData.uid) {
              return (
                <RemoteUsers
                  cameraStyle={cameraStyle(index, ids, styles)}
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
            } else if (joined) {
              return (
                <LocalUser
                  cameraSize={cameraStyle(index, ids, styles)}
                  myUserData={myUserData}
                  channelId={channelId}
                  activeVoice={myUserData.activeVoice}
                  countUsers={countUsers}
                  sizeUserPoint={sizeUserPoint}
                  wavesAroundUserPoint={wavesAroundUserPoint}
                />
              );
            }
          })}
        </View>
        <ButtonBar
          exitHandler={() => exitChannelHandler(AgoraEngine, navigation)}
          cameraHandler={cameraHandler}
          microphoneHandler={microphoneHandler}
          switchCamera={() => switchCamera(AgoraEngine)}
          muteCamera={myUserData.camera}
          muteVoice={myUserData.voice}
          isVideo={isVideo}
        />
      </View>
      <ListUsers hiddenUsers={hiddenUsers} />
    </View>
  );
};
