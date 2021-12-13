import {ListChannelsType} from '../../../Screens/Home/types';
import {RootState} from '../../store';

export const selectChannelsList = (state: RootState): ListChannelsType[] => {
  return state.home.listChannels;
};
