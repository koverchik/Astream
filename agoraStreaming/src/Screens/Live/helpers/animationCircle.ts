import {Animated} from 'react-native';

export const animationCircle = (
  sizeUserPoint: Animated.Value,
  wavesAroundUserPoint: Animated.Value,
) => {
  return Animated.loop(
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
    {iterations: -1},
  );
};
