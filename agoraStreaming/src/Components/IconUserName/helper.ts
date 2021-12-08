import {Dimensions} from 'react-native';

export const useValueForPosition = (
  countUser: number,
  index: number,
  SIZE_USER_POINT: number,
) => {
  const {height, width} = Dimensions.get('window');

  if (countUser === 2) {
    return {
      top: height / 4 - SIZE_USER_POINT / 2,
    };
  }

  if (countUser === 3) {
    if (index === 2) {
      return {
        top: height / 4 - SIZE_USER_POINT / 2,
        left: width / 2 - SIZE_USER_POINT / 2,
      };
    } else {
      return {
        top: height / 4 - SIZE_USER_POINT / 2,
        left: width / 4 - SIZE_USER_POINT,
      };
    }
  }
  if (countUser === 4) {
    return {
      top: height / 4 - SIZE_USER_POINT / 2,
      left: width / 4 - SIZE_USER_POINT,
    };
  }
};
