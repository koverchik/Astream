import {useWindowDimensions} from 'react-native';

export const useValueForPosition = (
  countUser: number,
  index: number,
  SIZE_USER_POINT: number,
) => {
  const {height, width} = useWindowDimensions();

  switch (countUser) {
    case 2:
      return {
        top: height / 4 - SIZE_USER_POINT / 2,
        left: width / 2 - SIZE_USER_POINT / 2,
      };
    case 3:
      if (index === 2) {
        return {
          top: height / 4 - SIZE_USER_POINT / 2,
          left: width / 2 - SIZE_USER_POINT / 2,
        };
      } else {
        return {
          top: height / 4 - SIZE_USER_POINT / 2,
          left: width / 4 - SIZE_USER_POINT / 2,
        };
      }
    case 4:
      return {
        top: height / 4 - SIZE_USER_POINT / 2,
        left: width / 4 - SIZE_USER_POINT / 2,
      };
    default:
      return {
        top: height / 2 - SIZE_USER_POINT / 2,
        left: width / 2 - SIZE_USER_POINT / 2,
      };
  }
};
