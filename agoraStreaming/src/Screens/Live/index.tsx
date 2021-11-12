import React, {FC, useEffect, useRef, useState} from 'react';
import {Animated, Platform, Text, View} from 'react-native';
import {styles} from './style';
import RtcEngine from 'react-native-agora';
import {isBroadcasterFunction} from './helpers/isBroadcaster';
import {LiveScreenProps, MuteSettingsType, UserType} from './types';
import database from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationPropNavigation} from '../Home/types';
import {errorAlert} from './helpers/alert';
import {requestCameraAndAudioPermission} from './helpers/permission';
import {v4 as uuid} from 'uuid';
import {findKeyDataInDatabase} from './helpers/findKeyDataInDatabase';
import {deleteChannel} from './helpers/deleteChannel';
import {ButtonBar} from '../../Components/ButtonBar/ButtonBar';
import {RemoteUsers} from '../../Components/RemoteUsers';
import {Preloader} from '../../Components/Preloader/Preloader';
import {animationCircle} from './helpers/animationCircle';
import {initChannel} from './helpers/channel';
import {LocalUserType} from '../../Components/RemoteUsers/types';
import {LocalUser} from '../../Components/LocalUser';

export const Live: FC<LiveScreenProps> = (props) => {
  const {channelId, name, coords} = props.route.params;

  const [joined, setJoined] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [peerIds, setPeerIds] = useState<UserType[]>([
    /*{
      uid: 1,
      camera: false,
      voice: false,
      activeVoice: false,
      userAccount: 'lol',
    },*/
    /*{
      uid: 2,
      camera: false,
      voice: false,
      activeVoice: false,
      userAccount: 'kek',
    },*/
    /*{
      uid: 3,
      camera: false,
      voice: false,
      activeVoice: false,
      userAccount: 'cheburek',
    },*/
  ]);
  const [myUserData, setMyUserData] = useState<LocalUserType>({
    uid: 0,
    userAccount: '',
    camera: false,
    voice: false,
  });

  const [activeVoice, activeVoiceSet] = useState(false);

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

  const exitChannelHandler = () => {
    AgoraEngine.current?.leaveChannel();
    navigation.goBack();
  };

  const cameraHandler = () => {
    setMyUserData((prev) => ({...prev, camera: !prev.camera}));
    AgoraEngine.current?.muteLocalVideoStream(!myUserData.camera);
  };

  const microphoneHandler = () => {
    setMyUserData((prev) => ({...prev, voice: !prev.voice}));
    AgoraEngine.current?.muteLocalAudioStream(!myUserData.voice);
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

    initChannel({
      AgoraEngine,
      userJoined,
      setMyUserData,
      peerIds,
      setPeerIds,
      activeVoiceSet,
      mute,
      userLeaveChannel,
      setStash,
    })
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

  const cameraStyle = (index: number, ids: UserType[]) => {
    switch (ids.length) {
      case 1: {
        return styles.camera_1;
      }
      case 2: {
        return styles.camera_2;
      }
      case 3: {
        if (index === 2) {
          return styles.camera_2;
        } else {
          return styles.camera_3;
        }
      }
      default:
        return styles.camera_3;
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.videoContainer, peerIds.length === 3 && styles.row]}>
        <View style={peerIds.length === 2 ? styles.column : styles.row}>
          {peerIds.map((user, index, ids) => {
            if (user.uid !== myUserData.uid) {
              return (
                <RemoteUsers
                  cameraStyle={cameraStyle(index, ids)}
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
                  cameraSize={cameraStyle(index, ids)}
                  myUserData={myUserData}
                  channelId={channelId}
                  activeVoice={activeVoice}
                  countUsers={countUsers}
                  sizeUserPoint={sizeUserPoint}
                  wavesAroundUserPoint={wavesAroundUserPoint}
                />
              );
            }
          })}
        </View>
      </View>
      <ButtonBar
        exitHandler={exitChannelHandler}
        cameraHandler={cameraHandler}
        microphoneHandler={microphoneHandler}
        switchCamera={switchCamera}
        muteCamera={myUserData.camera}
        muteVoice={myUserData.voice}
      />
      <Text
        style={{
          color: '#000',
          fontSize: 20,
          position: 'absolute',
          bottom: 20,
          right: 20,
        }}>
        {stash.length}
      </Text>
      <Text
        style={{
          color: '#000',
          fontSize: 20,
          position: 'absolute',
          bottom: 20,
          left: 20,
        }}>
        {peerIds.length}
      </Text>
    </View>
  );
};
