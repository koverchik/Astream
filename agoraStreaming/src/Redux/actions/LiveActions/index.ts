import {LiveActions, SetConnectStatusType, SetJoinedActionType} from './types';

export const setJoinedAction: SetJoinedActionType = (payload) => {
  return {type: LiveActions.SET_JOINED, payload};
};

export const setConnectStatus: SetConnectStatusType = (payload) => {
  return {type: LiveActions.SET_CONNECT_STATUS, payload};
};
