import {setConnectStatus, setJoinedAction} from '../../actions/LiveActions';
import {liveReducer} from './index';
import {ConnectStatus, LiveInitialStateType} from './types';

let state: LiveInitialStateType;

beforeEach(() => {
  state = {
    connectStatus: ConnectStatus.IDLE,
    isJoined: false,
  };
});

test('isJoined should be changed', () => {
  const endState = liveReducer(state, setJoinedAction(true));

  expect(endState.isJoined).toBe(true);
});

test('connectStatus should be changed', () => {
  const endState = liveReducer(state, setConnectStatus(ConnectStatus.LOADING));

  expect(endState.connectStatus).toBe(ConnectStatus.LOADING);
});
