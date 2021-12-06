import {TextInputProps} from 'react-native';

import {
  HeaderInputPlaceholders,
  TabNavigation,
} from '../../Navigation/Tab/types';
import {ListChannelsType} from '../../Screens/Home/types';

export type CustomHeaderPropsType = {
  title: string;
  placeholderText: HeaderInputPlaceholders;
  filter: TextInputProps['onChange'];
  screen: TabNavigation;

  searchResult?: ListChannelsType[];
  onPressResult?: (stream: ListChannelsType) => void;
};
