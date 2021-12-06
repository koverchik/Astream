import {ListChannelsType} from '../../../Screens/Home/types';

export type SearchResultItemPropsType = {
  item: ListChannelsType;

  onPressResult?: (stream: ListChannelsType) => void;
};
