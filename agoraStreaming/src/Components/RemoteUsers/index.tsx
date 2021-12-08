import React, {FC, useRef} from 'react';
import {Animated, View} from 'react-native';
import {RtcRemoteView, VideoRenderMode} from 'react-native-agora';

import {CameraMutedSvg} from '../../Icons/CameraMutedSvg';
import {MicroMutedSvg} from '../../Icons/MicroMutedSvg';
import {animationCircle} from '../../Screens/Live/helpers/animationCircle';
import {IconUserName} from '../IconUserName';
import {MuteIcon} from '../MuteIcon';
import {UserNameLabel} from '../UserNameLabel';
import {styles} from './styles';
import {RemoteUsersType} from './types';

export const RemoteUsers: FC<RemoteUsersType> = (props) => {
  const {
    index,
    uid,
    channelId,
    userAccount,
    countUsers,
    camera,
    activeVoice,
    cameraStyle,
    voice,
    isVideo,
  } = props;

  const sizeUserPoint = useRef(new Animated.Value(5)).current;
  const wavesAroundUserPoint = useRef(new Animated.Value(3)).current;
  animationCircle(sizeUserPoint, wavesAroundUserPoint).start();

  return (
    <View style={cameraStyle}>
      {camera ? (
        <View style={[styles.muteCamera, styles.rtcRemote]}>
          {activeVoice && (
            <IconUserName
              index={index}
              userName={userAccount}
              countUser={countUsers}
              sizeUserPoint={sizeUserPoint}
              wavesAroundUserPoint={wavesAroundUserPoint}
            />
          )}
        </View>
      ) : (
        <>
          <RtcRemoteView.SurfaceView
            style={styles.rtcRemote}
            uid={uid}
            channelId={channelId}
            renderMode={VideoRenderMode.Hidden}
            zOrderMediaOverlay={true}
          />
          {!isVideo && activeVoice && (
            <IconUserName
              userName={userAccount}
              countUser={countUsers}
              sizeUserPoint={sizeUserPoint}
              wavesAroundUserPoint={wavesAroundUserPoint}
              index={index}
            />
          )}
        </>
      )}
      <View style={styles.userNameContainer}>
        <UserNameLabel userName={userAccount} />
        <View style={styles.iconContainer}>
          {voice && <MuteIcon icon={<MicroMutedSvg />} />}
          {camera && <MuteIcon icon={<CameraMutedSvg />} />}
        </View>
      </View>
    </View>
  );
};
