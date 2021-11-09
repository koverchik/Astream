import React, {FC, useEffect, useRef} from 'react';
import {Animated, Dimensions, View} from 'react-native';
import {RtcRemoteView, VideoRenderMode} from 'react-native-agora';
import {ExitButton} from '../ExitButton/ExitButton';
import {IconUserName} from '../IconUserName';
import {UserNameLabel} from '../UserNameLabel/UserNameLabel';
import {styles} from './styles';
import {RemoteUsersType} from './types';

export const RemoteUsers: FC<RemoteUsersType> = (props) => {
  const {uid, channelId, userAccount, countUsers} = props;
  const sizeUserPoint = useRef(new Animated.Value(5)).current;
  const wavesAroundUserPoint = useRef(new Animated.Value(3)).current;

  const animationUserPoint = () => {
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
    ).start();
  };

  return (
    <View style={styles.userContainer} key={uid}>
      <RtcRemoteView.SurfaceView
        style={styles.userScreen}
        uid={uid}
        channelId={channelId}
        renderMode={VideoRenderMode.Hidden}
        zOrderMediaOverlay={true}
      />
      <IconUserName
        userName={userAccount}
        countUser={countUsers}
        sizeUserPoint={sizeUserPoint}
        wavesAroundUserPoint={wavesAroundUserPoint}
      />
      <ExitButton exitHandler={animationUserPoint} />
      <UserNameLabel userName={userAccount} />
    </View>
  );
};
