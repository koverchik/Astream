import {isBroadcasterFunction} from '../helpers/isBroadcaster';

test('is broadcaster?', () => {
  expect(isBroadcasterFunction('create')).toBeTruthy();
});
