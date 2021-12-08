import {ListChannelsType} from '../types';

export const getImage = (isVideo: ListChannelsType['isVideo']) => {
  if (isVideo) {
    return require('../../../../assets/images/video-camera.png');
  } else {
    return require('../../../../assets/images/sound-bars.png');
  }
};
