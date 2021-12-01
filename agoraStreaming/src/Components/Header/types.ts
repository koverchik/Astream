import {HeaderInputPlaceholders} from '../../Navigation/Tab/Helpers/types';
import {ListChannelsType} from '../../Screens/Home/types';

export type CustomHeaderPropsType = {
  title: string;
  placeholderText: HeaderInputPlaceholders;
  listForSearching: ListChannelsType[];
};
