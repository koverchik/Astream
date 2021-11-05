import React, {FC, useEffect, useRef, useState, Fragment} from 'react';
import {Text, Platform, View, ActivityIndicator} from 'react-native';
import {styles} from './style';
import RtcEngine, {
  ChannelProfile,
  ClientRole,
  RtcLocalView,
  RtcRemoteView,
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
import {useAppDispatch} from '../../Redux/hooks';
import {addUidAndKeyDB} from '../../Redux/action';

export const Live: FC<LiveScreenProps> = props => {
  const {channelId, name, coords} = props.route.params;
  const dispatch = useAppDispatch();

  const [joined, setJoined] = useState(false);

  const [error, setError] = useState(false);
  const [peerIds, setPeerIds] = useState<number[]>([]);

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
        addUserInArrayUidChannel(uid, channelId).then(data => {
          dispatch(addUidAndKeyDB(data?.uid, data?.channel));
        });
        changeStateChannel();
      },
    );

    AgoraEngine.current.addListener('LeaveChannel', StatsCallback => {
      console.log('LeaveChannel', StatsCallback);
    });

    AgoraEngine.current.addListener('UserOffline', (uid, reason) => {
      setPeerIds(prev => prev.filter(id => id !== uid));
    });
    AgoraEngine.current.addListener(
      'UserJoined',
      (uid: number, elapsed: number) => {
        // console.log('UserJoined', uid, elapsed);
        if (peerIds.indexOf(uid) === -1) {
          setPeerIds(prev => [...prev, uid]);
        }
      },
    );
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
    const uid = isBroadcaster ? 1 : 0;
    if (Platform.OS === 'android') {
      requestCameraAndAudioPermission();
    }

    init()
      .then(() => {
        AgoraEngine.current?.joinChannel(
          null,
          channelId,
          newReference.key,
          uid,
        );
        isBroadcaster ? addNewChannelInDB() : null;
      })
      .catch(e => {
        setError(true);
        errorAlert(e.message, goHome);
      });

    return () => {
      deleteUserInArrayUidChannel(uidCurrentChannel.current, channelId);
      isBroadcaster ? leaveChannel() : null;
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
        <RtcLocalView.SurfaceView
          style={styles.fullscreen}
          channelId={channelId}
        />
      )}
      {peerIds.map(value => {
        return (
          <RtcRemoteView.SurfaceView
            key={value}
            style={styles.usersScreen}
            uid={value}
            channelId={channelId}
            renderMode={VideoRenderMode.Hidden}
            zOrderMediaOverlay={true}
          />
        );
      })}
    </View>
  );
};
