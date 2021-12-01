import {Animated} from 'react-native';

export const showSearchInputAnimation = (
  animatedValue: Animated.Value,
  newValue: number,
) => {
  return Animated.timing(animatedValue, {
    toValue: newValue,
    duration: 1000,
    useNativeDriver: true,
  });
};
