import {Region} from 'react-native-maps';

import {ListChannelsType} from '../../../Screens/Home/types';
import {HomeActionsType} from '../../actions/HomeActions/types';

export type HomeInitialStateType = {
  coordinates: Region;
  listChannels: ListChannelsType[];
};

export type HomeReduserType = (
  state: HomeInitialStateType,
  action: HomeActionsType,
) => HomeInitialStateType;
