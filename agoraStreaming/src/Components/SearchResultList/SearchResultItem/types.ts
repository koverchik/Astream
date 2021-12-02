import {StreamType} from '../../../Screens/Calendar/types';
import {ListChannelsType} from '../../../Screens/Home/types';

export type SearchResultItemPropsType = {
  item: ListChannelsType | StreamType;

  onPressResult?: (stream: ListChannelsType | StreamType) => void;
};
