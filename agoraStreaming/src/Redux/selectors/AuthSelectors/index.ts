import {AuthDataType} from '../../reducers/Auth/types';
import {RootState} from '../../store';

export const selectUser = (state: RootState): AuthDataType | null =>
  state.auth.user;
