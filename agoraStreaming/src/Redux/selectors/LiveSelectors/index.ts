import {RootState} from '../../store';

export const getIsJoined = (state: RootState) => state.live.isJoined;
export const selectConnectStatus = (state: RootState) => {
  return state.live.connectStatus;
};
