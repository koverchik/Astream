import {TextInputProps} from 'react-native';

import {
  HeaderInputPlaceholders,
  TabNavigation,
} from '../../Navigation/Tab/types';
import {StreamType} from '../../Screens/Calendar/types';
import {ListChannelsType} from '../../Screens/Home/types';

export type CustomHeaderPropsType = {
  title: string;
  placeholderText: HeaderInputPlaceholders;
  filter: TextInputProps['onChange'];
  searchResult: ListChannelsType[] | StreamType[];
  screen: TabNavigation;

  onPressResult?: (stream: ListChannelsType) => void;
};
