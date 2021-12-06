import {ListChannelsType} from '../../Screens/Home/types';

export type SearchResultListPropsType = {
  searchResult?: ListChannelsType[];
  onPressResult?: (item: ListChannelsType) => void;
};
