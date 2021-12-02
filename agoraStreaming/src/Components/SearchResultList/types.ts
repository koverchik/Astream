import {StreamType} from '../../Screens/Calendar/types';
import {ListChannelsType} from '../../Screens/Home/types';

export type SearchResultListPropsType = {
  searchResult?: ListChannelsType[] | StreamType[];
  onPressResult?: (item: ListChannelsType | StreamType) => void;
};
