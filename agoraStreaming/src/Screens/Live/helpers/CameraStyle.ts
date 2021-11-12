import {UserType} from '../types';
import {LifeScreenStyles} from '../style';

export const cameraStyle = (
  index: number,
  ids: UserType[],
  styles: LifeScreenStyles,
) => {
  switch (ids.length) {
    case 1: {
      return styles.cameraFullScreen;
    }
    case 2: {
      return styles.cameraTwoUsers;
    }
    case 3: {
      if (index === 2) {
        return styles.cameraTwoUsers;
      } else {
        return styles.defaultCamera;
      }
    }
    default:
      return styles.defaultCamera;
  }
};
