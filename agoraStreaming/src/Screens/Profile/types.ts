import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {RouteProp} from '@react-navigation/native';

import {TabNavigation, TabParamList} from '../../Navigation/Tab/types';

export type ProfileScreenProps = {
  navigation: TabNavigationPropsProfileType;
  route: RouteProp<TabParamList, TabNavigation.Profile>;
};

export type TabNavigationPropsProfileType = BottomTabNavigationProp<
  TabParamList,
  TabNavigation.Profile
>;
