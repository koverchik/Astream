import {AuthActions, SetUserType} from './types';

export const setUser: SetUserType = (user) => {
  return {type: AuthActions.SET_USER, user};
};
