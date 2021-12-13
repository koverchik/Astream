import {ConnectStatus} from '../../reducers/Live/types';

export type LiveActionsType =
  | ReturnType<SetJoinedActionType>
  | ReturnType<SetConnectStatusType>;

export enum LiveActions {
  SET_JOINED = 'SET_JOINED',
  SET_CONNECT_STATUS = 'SET_CONNECT_STATUS',
}

export type SetJoinedActionType = (payload: boolean) => {
  type: LiveActions.SET_JOINED;
  payload: boolean;
};

export type SetConnectStatusType = (payload: ConnectStatus) => {
  type: LiveActions.SET_CONNECT_STATUS;
  payload: ConnectStatus;
};
