import {RootState} from '../../store';

export const selectJoined = (state: RootState) => state.live.joined;
