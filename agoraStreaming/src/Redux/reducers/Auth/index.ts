import {AuthActions, AuthActionsType} from '../../actions/AuthActions/types';
import {AuthStateType} from './types';

const initialState: AuthStateType = {
  user: null,
};

export const authReducer = (
  state = initialState,
  action: AuthActionsType,
): AuthStateType => {
  switch (action.type) {
    case AuthActions.SET_USER: {
      return {...state, user: action.user};
    }
    default:
      return state;
  }
};
