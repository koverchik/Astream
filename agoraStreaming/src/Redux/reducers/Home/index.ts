import {HomeActions, HomeActionsType} from '../../actions/HomeActions/types';
import {HomeInitialStateType} from './types';

const homeInitialState: HomeInitialStateType = {
  coordinates: {
    latitude: 53.5078788,
    longitude: 27.0877321,
    latitudeDelta: 2,
    longitudeDelta: 0.009,
  },
  listChannels: [],
};

export const homeReducer = (
  state = homeInitialState,
  action: HomeActionsType,
): HomeInitialStateType => {
  switch (action.type) {
    case HomeActions.SET_COORDINATES: {
      return {...state, coordinates: action.payload};
    }
    case HomeActions.SET_CHANNELS_LIST: {
      return {...state, listChannels: action.payload};
    }
    case HomeActions.SET_SHOW_CALLOUT: {
      const newListChannels = state.listChannels.map((channel) => {
        if (channel.channelId === action.payload.channelId) {
          return {...channel, calloutIsShow: action.payload.calloutIsShow};
        } else {
          return channel;
        }
      });

      return {...state, listChannels: newListChannels};
    }
    default:
      return state;
  }
};
