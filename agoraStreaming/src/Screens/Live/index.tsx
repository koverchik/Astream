import React, {FC, useEffect, useRef, useState, Fragment} from 'react';
import {Text, Platform, View, ActivityIndicator} from 'react-native';
import {styles} from './style';
import RtcEngine, {
  ChannelProfile,
  ClientRole,
  RtcLocalView,
  RtcRemoteView,
  UserOfflineReason,
} from 'react-native-agora';
import {isBroadcasterFunction} from './helpers/isBroadcaster';
import {LiveScreenProps, Members} from './types';
import {LiveType} from '../../Navigation/types';
import database from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationPropNavigation} from '../Home/types';
import {errorAlert} from './helpers/alert';
import {requestCameraAndAudioPermission} from './helpers/permission';

export const Live: FC<LiveScreenProps> = props => {
  const {channel, name, coords} = props.route.params;
  console.log(props.route.params);

  const [joined, setJoined] = useState(false);

  const [error, setError] = useState(false);

  const isBroadcaster = isBroadcasterFunction(props.route.params.type);

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
    if (isBroadcaster)
      AgoraEngine.current.setClientRole(ClientRole.Broadcaster);

    AgoraEngine.current.addListener('JoinChannelSuccess', changeStateChannel);
    AgoraEngine.current.addListener('UserOffline', (uid, reason) =>
      closeChannel(uid, reason),
    );
  };

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
      leaveChannel();
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
          channel,
          coords,
        },
        e => console.log(e),
      )
      .then(() => console.log('Data updated.'));
  };

  const leaveChannel = async () => {
    if (isBroadcaster) {
      await database().ref(`/channels/${newReference.key}`).remove();
    }
    AgoraEngine.current?.destroy();
  };

  useEffect(() => {
    const uid = isBroadcaster ? 1 : 0;
    if (Platform.OS === 'android') {
      requestCameraAndAudioPermission();
    }

    init()
      .then(() => {
        AgoraEngine.current?.joinChannel(null, channel, null, uid);
        isBroadcaster ? addNewChannelInDB() : null;
      })
      .catch(e => {
        setError(true);
        errorAlert(e.message, goHome);
      });

    return () => {
      console.log('exit');
      leaveChannel();
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
        <Fragment>
          {isBroadcaster ? (
            <RtcLocalView.SurfaceView
              style={styles.fullscreen}
              channelId={channel}
            />
          ) : (
            <RtcRemoteView.SurfaceView
              uid={1}
              style={styles.fullscreen}
              channelId={channel}
            />
          )}
        </Fragment>
      )}
    </View>
  );
};
