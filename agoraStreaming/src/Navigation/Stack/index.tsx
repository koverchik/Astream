import React, {useLayoutEffect, useState} from 'react';
import {NativeSyntheticEvent, TextInputChangeEventData} from 'react-native';

import {getHeaderTitle} from '@react-navigation/elements';
import {useNavigation} from '@react-navigation/native';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';

import {CustomHeader} from '../../Components/Header';
import {
  setCoordinatesAction,
  setShowCalloutAction,
} from '../../Redux/actions/HomeActions';
import {useAppDispatch, useAppSelector} from '../../Redux/hooks';
import {selectChannelsList} from '../../Redux/selectors/HomeSelectors';
import {TabNavigationPropsProfileType} from '../../Screens/Calendar/types';
import {Home} from '../../Screens/Home';
import {ListChannelsType} from '../../Screens/Home/types';
import {Live} from '../../Screens/Live';
import {HeaderInputPlaceholders, TabNavigation} from '../Tab/types';
import {HomeStackScreens, RootStackParamList} from './types';

const Stack = createStackNavigator<RootStackParamList>();

export const MainStack = () => {
  const options: StackNavigationOptions = {headerShown: false};

  const tabNavigation = useNavigation<TabNavigationPropsProfileType>();
  const channelsList = useAppSelector(selectChannelsList);
  const dispatch = useAppDispatch();

  const [searchResult, setSearchResult] = useState<ListChannelsType[]>([]);

  const onChangeSearchValue = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const result = channelsList.filter((channel) => {
      const matchFound = channel.name.includes(event.nativeEvent.text);
      const voidString = event.nativeEvent.text === '';

      if (matchFound && !voidString) {
        return channel;
      }
    });
    setSearchResult(result);
  };

  const onPressResult = (stream: ListChannelsType) => {
    dispatch(setCoordinatesAction(stream.coords));
    dispatch(
      setShowCalloutAction({channelId: stream.channelId, calloutIsShow: true}),
    );
    setSearchResult([]);
  };

  useLayoutEffect(() => {
    tabNavigation.setOptions({
      header: ({route, options}) => {
        const title = getHeaderTitle(options, route.name);
        return (
          <CustomHeader
            title={title}
            placeholderText={HeaderInputPlaceholders.MAIN}
            filter={onChangeSearchValue}
            onPressResult={onPressResult}
            searchResult={searchResult}
            screen={TabNavigation.Main}
          />
        );
      },
    });
  }, [tabNavigation, searchResult]);

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
