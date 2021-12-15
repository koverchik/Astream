import {
  NavigationContainerProps,
  NavigationState,
  PartialState,
} from '@react-navigation/native';

import analytics from '@react-native-firebase/analytics';

import {AnalyticsType} from '../../Types/universalTypes';

const takeNameScreen = (
  state: NavigationState | PartialState<NavigationState> | undefined,
): string | undefined => {
  if (state) {
    const {index, routeNames, routes} = state;

    if (index && routeNames && routes) {
      if (!Object.prototype.hasOwnProperty.call(routes[index], 'state')) {
        return routeNames[index];
      }

      return takeNameScreen(routes[index]['state']);
    }
  }
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
