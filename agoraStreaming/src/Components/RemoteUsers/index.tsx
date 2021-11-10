import React, {FC, useEffect, useRef, useState} from 'react';
import {Animated, Dimensions, View} from 'react-native';
import {RtcRemoteView, VideoRenderMode} from 'react-native-agora';
import {CameraMutedSvg} from '../../Icons/CameraMutedSvg';
import {MicroMutedSvg} from '../../Icons/MicroMutedSvg';
import {IconUserName} from '../IconUserName';
import {UserNameLabel} from '../UserNameLabel/UserNameLabel';
import {styles} from './styles';
import {RemoteUsersType} from './types';

export const RemoteUsers: FC<RemoteUsersType> = (props) => {
  const {uid, channelId, userAccount, countUsers, voice, camera, activeVoice} =
    props;

  const sizeUserPoint = useRef(new Animated.Value(5)).current;
  const wavesAroundUserPoint = useRef(new Animated.Value(3)).current;
  const [stateVoice, setStateVoice] = useState(activeVoice);

  useEffect(() => {
    stateVoice === activeVoice ? null : setStateVoice(activeVoice);
    stateVoice ? animation.start() : null;
  }, [activeVoice, stateVoice]);

  const animation = useRef(
    Animated.loop(
      Animated.parallel([
        Animated.spring(sizeUserPoint, {
          toValue: 3,
          useNativeDriver: true,
          stiffness: 10,
        }),
        Animated.spring(wavesAroundUserPoint, {
          toValue: 5,
          useNativeDriver: true,
          stiffness: 10,
        }),
      ]),
      {iterations: 100000},
    ),
  ).current;

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
          ) : (
            <CameraMutedSvg fill={'#262626'} />
          )}
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
