import {AuthDataType} from '../../reducers/Auth/types';

export type AuthActionsType = ReturnType<SetUserType>;

export enum AuthActions {
  SET_USER = 'SET-USER',
}

export type SetUserType = (user: AuthDataType | null) => {
  type: AuthActions.SET_USER;
  user: AuthDataType | null;
};
