import React, {FC, useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Platform, Text, View} from 'react-native';
import {styles} from './style';
import RtcEngine, {
  ChannelProfile,
  ClientRole,
  RtcLocalView,
  RtcRemoteView,
  UserInfo,
  VideoRenderMode,
} from 'react-native-agora';
import {isBroadcasterFunction} from './helpers/isBroadcaster';
import {LiveScreenProps, UserType} from './types';
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

export const Live: FC<LiveScreenProps> = (props) => {
  const {channelId, name, coords} = props.route.params;

  const [joined, setJoined] = useState(false);
  const [error, setError] = useState(false);
  const [peerIds, setPeerIds] = useState<UserType[]>([]);
  const [userName, setUserName] = useState<string>('');

  const [muteCamera, setMuteCamera] = useState<boolean>(false);

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

  const muteRemoteCamera = (uid: number, muted: boolean) => {
    setPeerIds((prevState) =>
      prevState.map((userData) => {
        if (userData.uid === uid) {
          return {...userData, muteCamera: muted};
        } else {
          return userData;
        }
      }),
    );
  };

  const init = async () => {
    AgoraEngine.current = await RtcEngine.create(
      'fecf7537eab9494b9612e782053cc546',
    );
    AgoraEngine.current.enableVideo();
    AgoraEngine.current.setChannelProfile(ChannelProfile.LiveBroadcasting);

    AgoraEngine.current.setClientRole(ClientRole.Broadcaster);

    AgoraEngine.current.addListener('JoinChannelSuccess', () => {
      changeStateChannel();
    });

    AgoraEngine.current.addListener('LocalUserRegistered', (uid, userInfo) => {
      setUserName(userInfo);
    });

    AgoraEngine.current.addListener(
      'UserInfoUpdated',
      (uid: number, userInfo: UserInfo) => {
        if (!peerIds.find((u) => u.uid === uid)) {
          const user: UserType = {
            ...userInfo,
            muteCamera: false,
            muteVoice: false,
          };
          setPeerIds((prev) => [...prev, user]);
        }
      },
    );

    AgoraEngine.current.addListener('UserOffline', (uid, reason) => {
      setPeerIds((prev) => prev.filter((user) => user.uid !== uid));
    });

    AgoraEngine.current.addListener('UserOffline', (uid) => {
      setPeerIds((prev) => prev.filter((userData) => userData.uid !== uid));
    });

    AgoraEngine.current?.addListener('LeaveChannel', (StatsCallback) => {
      StatsCallback.userCount === 1 ? userLeaveChannel() : null;
      AgoraEngine.current?.destroy();
    });

    AgoraEngine.current?.addListener(
      'UserMuteVideo',
      (uid: number, muted: boolean) => {
        muteRemoteCamera(uid, muted);
      },
    );
  };

  const addNewChannelInDB = async () => {
    await newReference.set({
      name,
      channelId,
      coords,
    });
  };

  const userLeaveChannel = () => {
    findKeyDataInDatabase(channelId).then((keyChannel) => {
      if (keyChannel) {
        deleteChannel(keyChannel);
      }
    });
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

  return (
    <View style={styles.container}>
      {joined && (
        <View style={styles.camera}>
          {muteCamera ? (
            <View style={[styles.muteCamera, styles.camera]}>
              <Text style={{color: '#fff'}}>Video muted</Text>
            </View>
          ) : (
            <RtcLocalView.SurfaceView
              style={styles.camera}
              channelId={channelId}
            />
          )}
          <UserNameLabel userName={userName} />
          <ButtonBar
            exitHandler={exitChannelHandler}
            cameraHandler={cameraHandler}
          />
        </View>
      )}
      {peerIds.map((user) => {
        return (
          <View style={styles.camera}>
            {user.muteCamera ? (
              <View style={[styles.muteCamera, styles.camera]}>
                <Text style={{color: '#fff'}}>Video muted</Text>
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
            <UserNameLabel userName={user.userAccount} />
          </View>
        );
      })}
    </View>
  );
};
