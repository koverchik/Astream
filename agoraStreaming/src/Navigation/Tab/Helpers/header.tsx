import React from 'react';

import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {getHeaderTitle} from '@react-navigation/elements';

import {CustomHeader} from '../../../Components/Header';
import {TabNavigation} from '../types';

export const renderHeader: BottomTabNavigationOptions['header'] = (props) => {
  const {options, route} = props;
  const title = getHeaderTitle(options, route.name);
  const routeProfileScreen = route.name === TabNavigation.Profile;

  return !routeProfileScreen && <CustomHeader title={title} />;
};
