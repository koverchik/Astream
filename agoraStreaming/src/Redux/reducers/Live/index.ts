import {LiveActions, LiveActionsType} from '../../actions/LiveActions/types';
import {LiveInitialStateType} from './types';

const liveInitialState: LiveInitialStateType = {
  isJoined: false,
};

export const liveReducer = (
  state = liveInitialState,
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
