import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import {Animated, Dimensions, View} from 'react-native';
import {RtcRemoteView, VideoRenderMode} from 'react-native-agora';
import {CameraMutedSvg} from '../../Icons/CameraMutedSvg';
import {MicroMutedSvg} from '../../Icons/MicroMutedSvg';
import {animationCircle} from '../../Screens/Live/helpers/animationCircle';
import {IconUserName} from '../IconUserName';
import {UserNameLabel} from '../UserNameLabel/UserNameLabel';
import {styles} from './styles';
import {RemoteUsersType} from './types';

export const RemoteUsers: FC<RemoteUsersType> = (props) => {
  const {uid, channelId, userAccount, countUsers, voice, camera, activeVoice} =
    props;

  const sizeUserPoint = useRef(new Animated.Value(5)).current;
  const wavesAroundUserPoint = useRef(new Animated.Value(3)).current;
  animationCircle(sizeUserPoint, wavesAroundUserPoint).start();

  return (
    <View style={styles.camera} key={uid}>
      {camera ? (
        <View style={[styles.muteCamera, styles.camera]}>
          {activeVoice ? (
            <IconUserName
              userName={userAccount}
              countUser={countUsers}
              sizeUserPoint={sizeUserPoint}
              wavesAroundUserPoint={wavesAroundUserPoint}
            />
          ) : null}
        </View>
      ) : (
        <RtcRemoteView.SurfaceView
          style={styles.camera}
          uid={uid}
          channelId={channelId}
          renderMode={VideoRenderMode.Hidden}
          zOrderMediaOverlay={true}
        />
      )}
      <View style={styles.userNameContainer}>
        <UserNameLabel userName={userAccount} />
        <View style={styles.iconContainer}>
          {voice && (
            <View style={styles.muteIcon}>
              <MicroMutedSvg />
            </View>
          )}
          {camera && (
            <View style={styles.muteIcon}>
              <CameraMutedSvg />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
