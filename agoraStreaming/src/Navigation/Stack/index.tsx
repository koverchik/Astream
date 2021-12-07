import React, {useLayoutEffect, useState} from 'react';
import {NativeSyntheticEvent, TextInputChangeEventData} from 'react-native';

import {getHeaderTitle} from '@react-navigation/elements';
import {useNavigation} from '@react-navigation/native';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';

import {CustomHeader} from '../../Components/Header';
import {SearchResultList} from '../../Components/SearchResultList/SearchResultList';
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
import {HeaderInputPlaceholders} from '../Tab/types';
import {HomeStackScreens, RootStackParamList} from './types';

const Stack = createStackNavigator<RootStackParamList>();

export const MainStack = () => {
  const options: StackNavigationOptions = {headerShown: false};

  const tabNavigation = useNavigation<TabNavigationPropsProfileType>();
  const channelsList = useAppSelector(selectChannelsList);
  const dispatch = useAppDispatch();

  const [searchResult, setSearchResult] = useState<ListChannelsType[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchMode, setSearchMode] = useState<boolean>(false);

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
    const propertiesForShowCallout = {
      channelId: stream.channelId,
      calloutIsShow: true,
    };

    dispatch(setCoordinatesAction(stream.coords));
    dispatch(setShowCalloutAction(propertiesForShowCallout));
    activeSearchMode();
    setSearchResult([]);
  };

  const activeSearchMode = () => {
    setSearchMode((searchMode) => {
      if (searchMode) {
        setSearchValue('');
      }

      return !searchMode;
    });
  };

  const renderFlatList = () => {
    return (
      !!searchValue &&
      searchMode && (
        <SearchResultList
          searchResult={searchResult}
          onPressResult={onPressResult}
        />
      )
    );
  };

  useLayoutEffect(() => {
    tabNavigation.setOptions({
      header: ({route, options}) => {
        const title = getHeaderTitle(options, route.name);

        return (
          <>
            <CustomHeader
              title={title}
              placeholderText={HeaderInputPlaceholders.MAIN}
              filter={onChangeSearchValue}
              inputValue={searchValue}
              onChangeInputText={setSearchValue}
              searchMode={searchMode}
              onChangeSearchMode={activeSearchMode}
            />
            {renderFlatList()}
          </>
        );
      },
    });
  }, [tabNavigation, searchResult, searchValue, searchMode]);

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
