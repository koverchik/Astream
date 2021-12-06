import {ListChannelsType} from '../../../Screens/Home/types';
import {
  setChannelsListAction,
  setCoordinatesAction,
} from '../../actions/HomeActions';
import {homeReducer} from './index';
import {HomeInitialStateType} from './types';

let state: HomeInitialStateType;

beforeEach(() => {
  state = {
    listChannels: [],
    coordinates: {
      latitude: 53.5078788,
      longitude: 27.0877321,
      latitudeDelta: 2,
      longitudeDelta: 0.009,
    },
  };
});

test('Coordinates should be changed', () => {
  const newCoords = {
    latitude: 1,
    longitude: 1,
    latitudeDelta: 1,
    longitudeDelta: 1,
  };

  const endState = homeReducer(state, setCoordinatesAction(newCoords));

  expect(endState.coordinates.longitudeDelta).toBe(1);
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
