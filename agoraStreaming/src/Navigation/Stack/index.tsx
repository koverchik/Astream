import React, {useLayoutEffect} from 'react';

import {getHeaderTitle} from '@react-navigation/elements';
import {useNavigation} from '@react-navigation/native';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';

import {CustomHeader} from '../../Components/Header';
import {useAppSelector} from '../../Redux/hooks';
import {selectChannelsList} from '../../Redux/selectors/HomeSelectors';
import {TabNavigationPropsProfileType} from '../../Screens/Calendar/types';
import {Home} from '../../Screens/Home';
import {Live} from '../../Screens/Live';
import {HeaderInputPlaceholders} from '../Tab/types';
import {HomeStackScreens, RootStackParamList} from './types';

const Stack = createStackNavigator<RootStackParamList>();

export const MainStack = () => {
  const options: StackNavigationOptions = {headerShown: false};

  const tabNavigation = useNavigation<TabNavigationPropsProfileType>();
  const channelsList = useAppSelector(selectChannelsList);

  useLayoutEffect(() => {
    tabNavigation.setOptions({
      header: ({route, options}) => {
        const title = getHeaderTitle(options, route.name);
        return (
          <CustomHeader
            title={title}
            placeholderText={HeaderInputPlaceholders.MAIN}
            listForSearching={channelsList}
          />
        );
      },
    });
  }, [tabNavigation]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={HomeStackScreens.Home}
        component={Home}
        options={options}
      />
      <Stack.Screen
        name={HomeStackScreens.Live}
        component={Live}
        options={options}
      />
    </Stack.Navigator>
  );
};
