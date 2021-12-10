import {useWindowDimensions} from 'react-native';

export const useValueForPosition = (
  countUser: number,
  index: number,
  SIZE_USER_POINT: number,
) => {
  const {height, width} = useWindowDimensions();
  const TOP_POSITION = height / 4 - SIZE_USER_POINT / 2;
  const LEFT_POSITION = width / 2 - SIZE_USER_POINT / 2;
  const LEFT_POSITION_FOUR_USERS = width / 4 - SIZE_USER_POINT / 2;

  switch (countUser) {
    case 2:
      return {
        top: TOP_POSITION,
        left: LEFT_POSITION,
      };
    case 3:
      if (index === 2) {
        return {
          top: TOP_POSITION,
          left: LEFT_POSITION,
        };
      } else {
        return {
          top: TOP_POSITION,
          left: LEFT_POSITION_FOUR_USERS,
        };
      }
    case 4:
      return {
        top: TOP_POSITION,
        left: LEFT_POSITION_FOUR_USERS,
      };
    default:
      return {
        top: TOP_POSITION,
        left: LEFT_POSITION,
      };
  }
};
