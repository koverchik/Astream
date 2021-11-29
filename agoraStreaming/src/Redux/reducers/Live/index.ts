import {LiveActions, LiveActionsType} from '../../actions/LiveActions/types';
import {LiveInitialStateType} from './types';

const LiveInitialState: LiveInitialStateType = {
  isJoined: false,
};

export const liveReducer = (
  state = LiveInitialState,
  action: LiveActionsType,
): LiveInitialStateType => {
  switch (action.type) {
    case LiveActions.SET_JOINED: {
      return {...state, isJoined: action.payload};
    }
    default:
      return state;
  }
};
