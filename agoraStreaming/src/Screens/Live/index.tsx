import React, {FC, useEffect, useRef, useState} from 'react';
import {Animated, Platform, View, useWindowDimensions} from 'react-native';
import RtcEngine from 'react-native-agora';
import {
  UidWithMutedCallback,
  UserAccountCallback,
  UserInfoCallback,
  UserOfflineCallback,
} from 'react-native-agora/lib/typescript/src/common/RtcEvents';

import {useNavigation} from '@react-navigation/native';

import {ButtonBar} from '../../Components/ButtonBar';
import {LocalUser} from '../../Components/LocalUser';
import {Preloader} from '../../Components/Preloader';
import {RemoteUser} from '../../Components/RemoteUsers';
import {LocalUserType} from '../../Components/RemoteUsers/types';
import {deleteChannelIdForEvent} from '../../Components/StreamEventsList/StreamEventItem/helpers/deleteChannelIdForEvent';
import {findEventDate} from '../../Components/StreamEventsList/StreamEventItem/helpers/findEventDate';
import {MainStackScreens} from '../../Navigation/Stack/types';
import {cameraStyle} from './helpers/CameraStyle';
import {addNewChannelInDB} from './helpers/addNewChannelInDB';
import {errorAlert} from './helpers/alert';
import {animationCircle} from './helpers/animationCircle';
import {audioVolumeIndicationCallback} from './helpers/audioVolumeIndicationCallback';
import {initChannel} from './helpers/channel';
import {deleteChannel} from './helpers/deleteChannel';
import {exitChannelHandler} from './helpers/exitChannelHandler';
import {findKeyDataInDatabase} from './helpers/findKeyDataInDatabase';
import {isBroadcasterFunction} from './helpers/isBroadcaster';
import {requestCameraAndAudioPermission} from './helpers/permission';
import {switchCamera} from './helpers/switchCamera';
import {userOfflineFilter} from './helpers/userOfflineFilter';
import {LiveStyles} from './style';
import {
  Devices,
  LiveScreenProps,
  MuteSettingsType,
  StackNavigationPropLive,
  UserType,
} from './types';
import {v4 as uuid} from 'uuid';

export const Live: FC<LiveScreenProps> = (props) => {
  const {channelId, name, coords, isVideo, type} = props.route.params;

  const INITIAL_DATA: LocalUserType = {
    uid: 0,
    userAccount: '',
    camera: false,
    voice: false,
    activeVoice: false,
    isVideo,
  };

  const {width} = useWindowDimensions();
  const styles = LiveStyles(width);

  const [isJoined, setIsJoined] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [peerIds, setPeerIds] = useState<UserType[]>([
    // {
    //   userAccount: 'name',
    //   uid: 2324,
    //   camera: true,
    //   voice: false,
    //   activeVoice: false,
    // },
    // {
    //   userAccount: 'sd',
    //   uid: 242,
    //   camera: true,
    //   voice: false,
    //   activeVoice: false,
    // },
    // {
    //   userAccount: 'df',
    //   uid: 2323424,
    //   camera: true,
    //   voice: false,
    //   activeVoice: false,
    // },
  ]);
  const [myUserData, setMyUserData] = useState<LocalUserType>(INITIAL_DATA);

  const [stash, setStash] = useState<UserType[]>([]);

  const isBroadcaster = isBroadcasterFunction(type);

  const AgoraEngine = useRef<RtcEngine>();

  const navigation = useNavigation<StackNavigationPropLive>();

  const goHome = () => navigation.navigate(MainStackScreens.Main);

  const sizeUserPoint = useRef(new Animated.Value(5)).current;
  const wavesAroundUserPoint = useRef(new Animated.Value(3)).current;

  animationCircle(sizeUserPoint, wavesAroundUserPoint).start();

  const userJoinedCallback = () => {
    setIsJoined(true);
  };

  const userOfflineCallback: UserOfflineCallback = (uid) => {
    setPeerIds((prev) => userOfflineFilter(prev, uid));
    setStash((prev) => userOfflineFilter(prev, uid));
  };

  const userMuteAudioCallback: UidWithMutedCallback = (uid, muted) => {
    setPeerIds((prevState) => {
      return muteDevice({uid, muted, device: Devices.VOICE}, prevState);
    });
  };

  const localUserRegisteredCallback: UserAccountCallback = (uid, userInfo) => {
    setMyUserData((prev) => ({
      ...prev,
      uid,
      userAccount: userInfo,
    }));
    const user: UserType = {
      uid,
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

  const userInfoUpdatedCallback: UserInfoCallback = (uid, userInfo) => {
    const userNotFound = !peerIds.find((userData) => userData.uid === uid);

    if (userNotFound) {
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

  const userMuteVideoCallback: UidWithMutedCallback = (uid, muted) => {
    setPeerIds((prevState) => {
      return muteDevice({uid, muted, device: Devices.CAMERA}, prevState);
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

  const muteDevice = (settings: MuteSettingsType, data: UserType[]) => {
    return data.map((userData) => {
      if (userData.uid === settings.uid) {
        return {...userData, [settings.device]: settings.muted};
      } else {
        return userData;
      }
    });
  };

  const userLeaveChannel = async () => {
    const keyChannel = await findKeyDataInDatabase(channelId);
    const eventDate = await findEventDate(channelId);
    setIsJoined(false);

    if (keyChannel) {
      await deleteChannel(keyChannel);
    }

    if (eventDate && keyChannel) {
      await deleteChannelIdForEvent(eventDate, keyChannel);
    }
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestCameraAndAudioPermission();
    }
    initChannel(
      AgoraEngine,
      userJoinedCallback,
      userLeaveChannel,
      userOfflineCallback,
      userInfoUpdatedCallback,
      userMuteVideoCallback,
      userMuteAudioCallback,
      localUserRegisteredCallback,
      audioVolumeIndicationCallback(setMyUserData, setPeerIds),
      isVideo,
    )
      .then(() => {
        AgoraEngine.current?.joinChannelWithUserAccount(
          null,
          channelId,
          uuid(),
        );
        if (name && coords) {
          isBroadcaster &&
            addNewChannelInDB({channelId, name, coords, isVideo});
        }
      })
      .catch((e) => {
        setError(true);
        errorAlert(e.message, goHome);
      });

    return () => {
      AgoraEngine.current?.leaveChannel();
    };
  }, []);

  const renderUsers = peerIds.map((user, index, ids) => {
    const remoteUserId = user.uid !== myUserData.uid;

    if (remoteUserId) {
      return (
        <RemoteUser
          index={index}
          cameraStyle={cameraStyle(index, ids, styles)}
          key={'RemoteUser' + user.uid}
          uid={user.uid}
          channelId={channelId}
          countUsers={peerIds.length}
          userAccount={user.userAccount}
          voice={user.voice}
          camera={user.camera}
          activeVoice={user.activeVoice}
          isVideo={isVideo}
        />
      );
    }

    if (!remoteUserId && isJoined) {
      return (
        <LocalUser
          key={user.uid}
          index={index}
          cameraSize={cameraStyle(index, ids, styles)}
          myUserData={myUserData}
          channelId={channelId}
          activeVoice={myUserData.activeVoice}
          countUsers={peerIds.length}
          sizeUserPoint={sizeUserPoint}
          wavesAroundUserPoint={wavesAroundUserPoint}
          isVideo={isVideo}
        />
      );
    }
  });

  if (!error && !isJoined) {
    return <Preloader text={'Joining Stream, Please Wait'} />;
  }

  const getViewStyle = (usersCount: number) => {
    switch (usersCount) {
      case 1:
      case 2: {
        return styles.column;
      }
      case 3:
      case 4: {
        return styles.row;
      }
      default:
        return styles.column;
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.videoContainer, getViewStyle(peerIds.length)]}>
        <View style={getViewStyle(peerIds.length)}>{renderUsers}</View>
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
      {/* // TODO: hide element for demo*/}
      {/* <ListUsers hiddenUsers={hiddenUsers} /> */}
    </View>
  );
};
