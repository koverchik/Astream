import {ListChannelsType} from '../../../Screens/Home/types';
import {setChannelsListAction} from '../../actions/HomeActions';
import {homeReducer} from './index';
import {HomeInitialStateType} from './types';

let state: HomeInitialStateType;

beforeEach(() => {
  state = {
    listChannels: [],
  };
});

test('New channel should be added', () => {
  const newChannel: ListChannelsType = {
    channelId: '95df697b-90e3-491c-8cb1-8bcb16a4b741',
    coords: {
      latitude: 53.999785,
      latitudeDelta: 2,
      longitude: 27.333706,
      longitudeDelta: 0.009,
    },
    isVideo: true,
    name: 'Test',
    calloutIsShow: false,
  };

  const endState = homeReducer(state, setChannelsListAction([newChannel]));

  expect(endState.listChannels[0].name).toBe('Test');
});
