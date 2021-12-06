import {AuthActionsType} from '../../actions/AuthActions/types';

export type AuthStateType = {
  user: AuthDataType | null;
};

export type AuthDataType = {
  email: string | null;
  familyName: string | null;
  givenName: string | null;
  id: string | null;
  name: string | null;
  photo: string | null;
};

export type AuthReducerType = (
  state: AuthStateType,
  action: AuthActionsType,
) => AuthStateType;
