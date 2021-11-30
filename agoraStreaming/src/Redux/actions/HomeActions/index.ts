import {
  HomeActions,
  SetChannelsListActionType,
  SetCoordinatesActionType,
} from './types';

export const setCoordinatesAction: SetCoordinatesActionType = (payload) => {
  return {type: HomeActions.SET_COORDINATES, payload};
};

export const setChannelsListAction: SetChannelsListActionType = (payload) => {
  return {type: HomeActions.SET_CHANNELS_LIST, payload};
};
