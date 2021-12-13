import {LiveActions, LiveActionsType} from '../../actions/LiveActions/types';
import {ConnectStatus, LiveInitialStateType} from './types';

const liveInitialState: LiveInitialStateType = {
  isJoined: false,
  connectStatus: ConnectStatus.IDLE,
};

export const liveReducer = (
  state = liveInitialState,
  action: LiveActionsType,
): LiveInitialStateType => {
  switch (action.type) {
    case LiveActions.SET_JOINED: {
      return {...state, isJoined: action.payload};
    }
    case LiveActions.SET_CONNECT_STATUS: {
      return {...state, connectStatus: action.payload};
    }
    default:
      return state;
  }
};
