import {
  HomeActions,
  SetChannelsListActionType,
  SetShowCalloutActionType,
} from './types';

export const setChannelsListAction: SetChannelsListActionType = (payload) => {
  return {type: HomeActions.SET_CHANNELS_LIST, payload};
};

export const setShowCalloutAction: SetShowCalloutActionType = (payload) => {
  return {type: HomeActions.SET_SHOW_CALLOUT, payload};
};
