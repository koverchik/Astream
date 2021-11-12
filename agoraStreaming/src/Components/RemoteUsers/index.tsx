import React, {FC, useRef} from 'react';
import {Animated, View} from 'react-native';
import {RtcRemoteView, VideoRenderMode} from 'react-native-agora';
import {animationCircle} from '../../Screens/Live/helpers/animationCircle';
import {IconUserName} from '../IconUserName';
import {styles} from './styles';
import {RemoteUsersType} from './types';
import {UserNameLabel} from '../UserNameLabel/UserNameLabel';

export const RemoteUsers: FC<RemoteUsersType> = (props) => {
  const {
    uid,
    channelId,
    userAccount,
    countUsers,
    camera,
    activeVoice,
    cameraStyle,
  } = props;

  const sizeUserPoint = useRef(new Animated.Value(5)).current;
  const wavesAroundUserPoint = useRef(new Animated.Value(3)).current;
  animationCircle(sizeUserPoint, wavesAroundUserPoint).start();

  return (
    <View style={cameraStyle} key={uid}>
      {camera ? (
        <View style={[styles.muteCamera, cameraStyle]}>
          {activeVoice && (
            <IconUserName
              userName={userAccount}
              countUser={countUsers}
              sizeUserPoint={sizeUserPoint}
              wavesAroundUserPoint={wavesAroundUserPoint}
            />
          )}
        </View>
      ) : (
        <RtcRemoteView.SurfaceView
          style={styles.rtcRemote}
          uid={uid}
          channelId={channelId}
          renderMode={VideoRenderMode.Hidden}
          zOrderMediaOverlay={true}
        />
      )}
      <View style={styles.userNameContainer}>
        <UserNameLabel userName={userAccount} />
      </View>
    </View>
  );
};
