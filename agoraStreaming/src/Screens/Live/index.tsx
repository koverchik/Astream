import React, {FC, useEffect, useRef, useState} from 'react';
import {
  Text,
  Platform,
  View,
  PermissionsAndroid,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {styles} from './style';

import RtcEngine, {
  ChannelProfile,
  ClientRole,
  RtcLocalView,
  RtcRemoteView,
  UserOfflineReason,
} from 'react-native-agora';
import {LiveScreenProps, Members} from './types';
import {LiveType} from '../../Navigation/types';
import database from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationPropNavigation} from '../Home/types';

export const Live: FC<LiveScreenProps> = props => {
  const idChannel = props.route.params.channel;
  console.log(idChannel);

  async function requestCameraAndAudioPermission() {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
      if (
        granted['android.permission.RECORD_AUDIO'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.CAMERA'] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('You can use the cameras & mic');
      } else {
        console.log('Permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
  const [joined, setJoined] = useState(false);

  const [error, setError] = useState(false);

  const isBroadcaster = props.route.params.type === LiveType.CREATE;

  const AgoraEngine = useRef<RtcEngine>();

  const newReference = database().ref('/channels').push();

  const navigation = useNavigation<StackNavigationPropNavigation>();

  const goHome = () => navigation.navigate('Home');

  const changeStateChannel = () => {
    setJoined(true);
  };

  const errorAlert = (message: string) => {
    Alert.alert('Error', message, [
      {
        text: 'Cancel',
        onPress: () => goHome(),
        style: 'cancel',
      },
    ]);
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
      errorAlert('The user left the current channel.');
    }
    if (uid === Members.Broadcaster && reason === UserOfflineReason.Dropped) {
      setJoined(false);
      setError(true);
      errorAlert(
        'User dropped offline, no data is received within a long period of time.',
      );
    }
  };

  const addNewChannel = () => {
    newReference
      .set(
        {
          name: idChannel,
        },
        e => console.log(e),
      )
      .then(() => console.log('Data updated.'));
  };

  useEffect(() => {
    const uid = isBroadcaster ? 1 : 0;
    if (Platform.OS === 'android') requestCameraAndAudioPermission();

    init()
      .then(() =>
        AgoraEngine.current?.joinChannel(
          null,
          props.route.params.channel,
          null,
          uid,
        ),
      )
      .catch(e => {
        setError(true);
        errorAlert(e.message);
      });

    isBroadcaster ? addNewChannel() : null;
    return () => {
      console.log('exit');
      database().ref(`/channels/${newReference.key}`).remove();
      AgoraEngine.current?.destroy();
    };
  }, []);

  return (
    <View style={styles.container}>
      {!joined ? (
        error ? null : (
          <>
            <ActivityIndicator size={60} color="#222" />
            <Text style={styles.loadingText}>Joining Stream, Please Wait</Text>
          </>
        )
      ) : (
        <>
          {isBroadcaster ? (
            <RtcLocalView.SurfaceView
              style={styles.fullscreen}
              channelId={props.route.params.channel}
            />
          ) : (
            <RtcRemoteView.SurfaceView
              uid={1}
              style={styles.fullscreen}
              channelId={props.route.params.channel}
            />
          )}
        </>
      )}
    </View>
  );
};
