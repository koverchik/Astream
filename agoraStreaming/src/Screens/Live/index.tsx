import React, {FC, useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Platform, Text, View} from 'react-native';
import {styles} from './style';
import RtcEngine, {
  ChannelProfile,
  ClientRole,
  RtcLocalView,
  RtcRemoteView,
  UserInfo,
  UserOfflineReason,
  VideoRenderMode,
} from 'react-native-agora';
import {isBroadcasterFunction} from './helpers/isBroadcaster';
import {LiveScreenProps, Members} from './types';
import database from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationPropNavigation} from '../Home/types';
import {errorAlert} from './helpers/alert';
import {requestCameraAndAudioPermission} from './helpers/permission';
import {
  addUserInArrayUidChannel,
  deleteUserInArrayUidChannel,
} from './helpers/newArrayUidChannel';
import {updateDataChannel} from './helpers/updateDataChannelUids';
import {v4 as uuid} from 'uuid';
import {UserNameLabel} from '../../Components/UserNameLabel/UserNameLabel';
import {ExitButton} from '../../Components/ExitButton/ExitButton';

type UserType = {
  userAccount: string;
  uid: number;
};

export const Live: FC<LiveScreenProps> = props => {
  const {channelId, name, coords} = props.route.params;

  const [joined, setJoined] = useState(false);

  const [error, setError] = useState(false);
  const [peerIds, setPeerIds] = useState<UserType[]>([]);
  const [userName, setUserName] = useState<string>('');

  const isBroadcaster = isBroadcasterFunction(props.route.params.type);

  const uidCurrentChannel = useRef<number>();
  const AgoraEngine = useRef<RtcEngine>();

  const newReference = database().ref('/channels').push();

  const navigation = useNavigation<StackNavigationPropNavigation>();

  const goHome = () => navigation.navigate('Home');

  const changeStateChannel = () => {
    setJoined(true);
  };

  const init = async () => {
    AgoraEngine.current = await RtcEngine.create(
      'fecf7537eab9494b9612e782053cc546',
    );
    AgoraEngine.current.enableVideo();
    AgoraEngine.current.setChannelProfile(ChannelProfile.LiveBroadcasting);

    AgoraEngine.current.setClientRole(ClientRole.Broadcaster);

    AgoraEngine.current.addListener(
      'JoinChannelSuccess',
      (channel: string, uid: number, elapsed: number) => {
        uidCurrentChannel.current = uid;
        const uidBrodcaster = [uid];
        isBroadcaster
          ? updateDataChannel(newReference.key, uidBrodcaster)
          : addUserInArrayUidChannel(uid, channelId);

        changeStateChannel();
      },
    );

    AgoraEngine.current.addListener('LeaveChannel', StatsCallback => {
      console.log('LeaveChannel', StatsCallback);
    });

    AgoraEngine.current.addListener('LocalUserRegistered', (uid, userInfo) => {
      console.log('You join channel', userInfo);
      setUserName(userInfo);
    });

    AgoraEngine.current.addListener(
      'UserInfoUpdated',
      (uid: number, userInfo: UserInfo) => {
        if (!peerIds.find(u => u.uid === uid)) {
          setPeerIds(prev => [...prev, userInfo]);
        }
        console.log(userInfo);
      },
    );

    AgoraEngine.current.addListener('UserOffline', (uid, reason) => {
      setPeerIds(prev => prev.filter(user => user.uid !== uid));
    });
  };

  //unnecessary function this function need for allert with errors

  const closeChannel = (uid: number, reason: UserOfflineReason) => {
    if (uid === Members.Broadcaster && reason === UserOfflineReason.Quit) {
      setJoined(false);
      setError(true);
      errorAlert('The user left the current channel.', goHome);
      leaveChannel();
    }
    if (uid === Members.Broadcaster && reason === UserOfflineReason.Dropped) {
      setJoined(false);
      setError(true);
      errorAlert(
        'User dropped offline, no data is received within a long period of time.',
        goHome,
      );
      leaveChannel();
    }
  };

  const addNewChannelInDB = () => {
    newReference
      .set(
        {
          name,
          channelId,
          coords,
        },
        e => console.log(e),
      )
      .then(() => console.log('Data set.'));
  };

  const leaveChannel = async () => {
    await database().ref(`/channels/${newReference.key}`).remove();
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
      .catch(e => {
        setError(true);
        errorAlert(e.message, goHome);
      });

    return () => {
      isBroadcaster ? leaveChannel() : null;
      deleteUserInArrayUidChannel(uidCurrentChannel.current, channelId);
      AgoraEngine.current?.destroy();
      console.log('exit first');
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
        <>
          <RtcLocalView.SurfaceView
            style={styles.fullscreen}
            channelId={channelId}
          />
          <UserNameLabel userName={userName} />
          <ExitButton />
        </>
      )}
      {peerIds.map(user => {
        return (
          <View style={styles.usersScreen}>
            <RtcRemoteView.SurfaceView
              style={styles.usersScreen}
              uid={user.uid}
              channelId={channelId}
              renderMode={VideoRenderMode.Hidden}
              zOrderMediaOverlay={true}
            />
            <UserNameLabel userName={user.userAccount} />
          </View>
        );
      })}
    </View>
  );
};
