import {Region} from 'react-native-maps';

import {ListChannelsType} from '../../../Screens/Home/types';
import {RootState} from '../../store';

export const selectCoordinates = (state: RootState): Region => {
  return state.home.coordinates;
};

export const selectChannelsList = (state: RootState): ListChannelsType[] => {
  return state.home.listChannels;
};
