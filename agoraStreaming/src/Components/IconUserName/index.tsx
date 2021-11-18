import React, {FC} from 'react';
import {Animated, Dimensions, Text} from 'react-native';

import {styles} from './styles';
import {IconUserNameType} from './types';

const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

export const IconUserName: FC<IconUserNameType> = (props) => {
  const {userName, countUser, sizeUserPoint, wavesAroundUserPoint} = props;
  const valueTop = dimensions.height / 2 / countUser() - 20;
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
          {
            top: valueTop,
            transform: transformCircleAround,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.pointUserName,
          {
            top: valueTop,
            transform: transformAround,
          },
        ]}>
        <Text>{userName.slice(0, 1)}</Text>
      </Animated.View>
    </>
  );
};
