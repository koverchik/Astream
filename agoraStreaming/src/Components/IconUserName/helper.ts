import {Dimensions} from 'react-native';

import {SIZE_USER_POINT} from '.';

const {height, width} = Dimensions.get('window');

export const useValueForPosition = (countUser: number, index: number) => {
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
