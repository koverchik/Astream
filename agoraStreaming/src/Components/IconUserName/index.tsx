import React, {FC} from 'react';
import {Animated, Text} from 'react-native';

import {useValueForPosition} from './helper';
import {styles} from './styles';
import {IconUserNameType} from './types';

export const SIZE_USER_POINT = 30;

export const IconUserName: FC<IconUserNameType> = (props) => {
  const {userName, countUser, sizeUserPoint, wavesAroundUserPoint, index} =
    props;

  const position = useValueForPosition(countUser, index);

  const transformCircleAround = [
    {
      scale: wavesAroundUserPoint.interpolate({
        inputRange: [3, 4, 5],
        outputRange: [3, 4.5, 3],
      }),
    },
  ];

  const transformAround = [
    {
      scale: sizeUserPoint.interpolate({
        inputRange: [3, 4, 5],
        outputRange: [4, 3, 4],
      }),
    },
  ];

  return (
    <>
      <Animated.View
        style={[
          styles.wavesAroundUserPoint,
          position,
          {
            transform: transformCircleAround,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.pointUserName,
          position,
          {
            transform: transformAround,
          },
        ]}>
        <Text>{userName.slice(0, 1).toUpperCase()}</Text>
      </Animated.View>
    </>
  );
};
