import React, {FC, useEffect, useRef, useState} from 'react';
import {Text, Platform, View, ActivityIndicator} from 'react-native';
import {styles} from './style';
import RtcEngine, {
  ChannelProfile,
  ClientRole,
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
} from 'react-native-agora';
import {isBroadcasterFunction} from './helpers/isBroadcaster';
import {LiveScreenProps} from './types';
import database from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationPropNavigation} from '../Home/types';
import {errorAlert} from './helpers/alert';
import {requestCameraAndAudioPermission} from './helpers/permission';
import {findKeyDataInDatabase} from './helpers/findKeyDataInDatabase';
import {deleteChannel} from './helpers/deleteChannel';

export const Live: FC<LiveScreenProps> = props => {
  const {channelId, name, coords} = props.route.params;

  const [joined, setJoined] = useState(false);
  const [error, setError] = useState(false);

  const [peerIds, setPeerIds] = useState<number[]>([]);

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

    AgoraEngine.current.setClientRole(ClientRole.Broadcaster);

    AgoraEngine.current.addListener('JoinChannelSuccess', () => {
      changeStateChannel();
    });

    AgoraEngine.current.addListener('UserOffline', uid => {
      setPeerIds(prev => prev.filter(id => id !== uid));
    });
    AgoraEngine.current.addListener('UserJoined', (uid: number) => {
      if (peerIds.indexOf(uid) === -1) {
        setPeerIds(prev => [...prev, uid]);
      }
    });
    AgoraEngine.current?.addListener('LeaveChannel', StatsCallback => {
      console.log('LeaveChannel', StatsCallback);
      StatsCallback.userCount === 1 ? userLeaveChannel() : null;
      AgoraEngine.current?.destroy();
    });
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

  const userLeaveChannel = () => {
    findKeyDataInDatabase(channelId).then(keyChannel => {
      if (keyChannel) deleteChannel(keyChannel);
    });
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
