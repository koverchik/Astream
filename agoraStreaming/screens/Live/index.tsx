import React, {FC, useEffect, useRef, useState} from 'react';
import {
  Text,
  Platform,
  View,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import {createStyles} from './style';

import RtcEngine, {
  ChannelProfile,
  ClientRole,
  RtcLocalView,
  RtcRemoteView,
} from 'react-native-agora';
import {LiveScreenProps} from './types';

export const Live: FC<LiveScreenProps> = props => {
  console.log(props.route.params.channel);

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
  const isBroadcaster = props.route.params.type === 'create';

  const AgoraEngine = useRef<RtcEngine>();
  const Style = createStyles();

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
  };

  useEffect(() => {
    (async () => {
      const uid = isBroadcaster ? 1 : 0;
      if (Platform.OS === 'android') await requestCameraAndAudioPermission();
      init().then(() =>
        AgoraEngine.current != undefined
          ? AgoraEngine.current.joinChannel(
              null,
              props.route.params.channel,
              null,
              uid,
            )
          : null,
      );
    })();
    return () => {
      console.log('exit');
      AgoraEngine.current != undefined ? AgoraEngine.current.destroy() : null;
    };
  }, []);

  return (
    <View style={Style.container}>
      {!joined ? (
        <>
          <ActivityIndicator
            size={60}
            color="#222"
            style={Style.activityIndicator}
          />
          <Text style={Style.loadingText}>Joining Stream, Please Wait</Text>
        </>
      ) : (
        <>
          {isBroadcaster ? (
            <RtcLocalView.SurfaceView
              style={Style.fullscreen}
              channelId={props.route.params.channel}
            />
          ) : (
            <RtcRemoteView.SurfaceView
              uid={1}
              style={Style.fullscreen}
              channelId={props.route.params.channel}
            />
          )}
        </>
      )}
    </View>
  );
};