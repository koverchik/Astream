import {ImagePaths, ListChannelsType} from '../types';

export const getImage = (isVideo: ListChannelsType['isVideo']) => {
  if (isVideo) {
    return require(ImagePaths.VIDEO);
  } else {
    return require(ImagePaths.SOUND);
  }
};
