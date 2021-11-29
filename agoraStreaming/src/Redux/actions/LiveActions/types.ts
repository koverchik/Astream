export type LiveActionsType = ReturnType<SetJoinedActionType>;

export enum LiveActions {
  SET_JOINED = 'SET_JOINED',
}

export type SetJoinedActionType = (payload: boolean) => {
  type: LiveActions.SET_JOINED;
  payload: boolean;
};
