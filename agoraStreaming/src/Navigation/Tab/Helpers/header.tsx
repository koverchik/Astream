import React from 'react';

import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {getHeaderTitle} from '@react-navigation/elements';

import {CustomHeader} from '../../../Components/Header';
import {TabNavigation} from '../types';
import {HeaderInputPlaceholders} from './types';

export const renderHeader: BottomTabNavigationOptions['header'] = (props) => {
  const {options, route} = props;
  const title = getHeaderTitle(options, route.name);

  switch (route.name) {
    case TabNavigation.Profile: {
      return null;
    }
    case TabNavigation.Main: {
      return (
        <CustomHeader
          title={title}
          placeholderText={HeaderInputPlaceholders.MAIN}
        />
      );
    }
    case TabNavigation.Calendar: {
      return (
        <CustomHeader
          title={title}
          placeholderText={HeaderInputPlaceholders.CALENDAR}
        />
      );
    }
    default:
      return null;
  }
};
