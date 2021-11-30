import {ListChannelsType} from '../../Screens/Home/types';

export type FoundStreamListPropsType = {
  searchResult: ListChannelsType[];
  onPressResult: (stream: ListChannelsType) => void;
};
