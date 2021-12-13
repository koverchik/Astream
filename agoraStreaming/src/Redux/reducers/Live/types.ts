export type LiveInitialStateType = {
  isJoined: boolean;
  connectStatus: ConnectStatus;
};

export enum ConnectStatus {
  FAILED = 'FAILED',
  SUCCESS = 'SUCCESS',
  IDLE = 'IDLE',
  LOADING = 'LOADING',
}
