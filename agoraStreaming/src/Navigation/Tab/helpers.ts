import {NavigationState} from '@react-navigation/native';

import analytics from '@react-native-firebase/analytics';

import {AnalyticsType} from '../../Types/universalTypes';
import {TakeNameScreenType} from './types';

const takeNameScreen: TakeNameScreenType = (state) => {
  const {index} = state;

  if (!Object.prototype.hasOwnProperty.call(state.routes[index], 'state')) {
    return state.routeNames[index];
  }

  return takeNameScreen(state.routes[index]['state']);
};

export const eventChangeScreen = (state: NavigationState | undefined) => {
  if (state) {
    analytics().logEvent(AnalyticsType.CLICK_ON_TAB, {
      tab: takeNameScreen(state),
    });
  }
};
