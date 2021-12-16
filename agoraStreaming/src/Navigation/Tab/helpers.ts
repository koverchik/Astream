import {
  NavigationContainerProps,
  NavigationState,
} from '@react-navigation/native';

import analytics from '@react-native-firebase/analytics';

import {AnalyticsType} from '../../Types/universalTypes';

const takeNameScreen = (state: NavigationState): string => {
  const {index, routeNames, routes} = state;

  if (!Object.prototype.hasOwnProperty.call(routes[index], 'state')) {
    return routeNames?.[index];
  }

  return takeNameScreen(routes[index]['state']);
};

export const eventChangeScreen: NavigationContainerProps['onStateChange'] = (
  state,
) => {
  if (state) {
    analytics().logEvent(AnalyticsType.PASSAGE_TO_SCREEN, {
      screan: takeNameScreen(state),
    });
  }
};
