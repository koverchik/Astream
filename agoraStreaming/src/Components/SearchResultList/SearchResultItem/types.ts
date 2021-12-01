import {ListChannelsType} from '../../../Screens/Home/types';

export type SearchResultItemPropsType = {
  onPressResult: (stream: ListChannelsType) => void;
  item: ListChannelsType;
};
