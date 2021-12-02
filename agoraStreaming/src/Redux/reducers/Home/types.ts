import {Region} from 'react-native-maps';

import {ListChannelsType} from '../../../Screens/Home/types';

export type HomeInitialStateType = {
  coordinates: Region;
  listChannels: ListChannelsType[];
};
