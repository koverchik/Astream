import {LiveActionsType} from '../../actions/LiveActions/types';

export type LiveInitialStateType = {
  isJoined: boolean;
};

export type LiveReduserType = (
  state: LiveInitialStateType,
  action: LiveActionsType,
) => LiveInitialStateType;
