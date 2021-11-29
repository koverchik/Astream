import {LiveActions, SetJoinedActionType} from './types';

export const setJoinedAction: SetJoinedActionType = (payload) => {
  return {type: LiveActions.SET_JOINED, payload};
};
