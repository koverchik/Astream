import {ListChannelsType} from '../../../Screens/Home/types';

export type FoundStreamItemPropsType = {
  onPressResult: (stream: ListChannelsType) => void;
  stream: ListChannelsType;
};
