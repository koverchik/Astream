import {LiveActionsType} from '../../actions/LiveActions/types';

export type LiveInitialStateType = {
  isJoined: boolean;
};

export type LiveReducerType = (
  state: LiveInitialStateType,
  action: LiveActionsType,
) => LiveInitialStateType;
