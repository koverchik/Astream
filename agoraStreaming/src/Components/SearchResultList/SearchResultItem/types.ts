import {StreamType} from '../../../Screens/Calendar/types';
import {ListChannelsType} from '../../../Screens/Home/types';

export type SearchResultItemPropsType = {
  onPressResult?: (stream: ListChannelsType) => void;
  item: ListChannelsType | StreamType;
};
