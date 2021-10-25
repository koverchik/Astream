import {LiveType} from '../../../Navigation/types';
import {isBroadcasterFunction} from '../helpers/isBroadcaster';

describe('Check broadcaster', () => {
  test('true check result', () => {
    expect(isBroadcasterFunction(LiveType.CREATE)).toBeTruthy();
  });

  test('false check result', () => {
    expect(isBroadcasterFunction(LiveType.JOIN)).toBeFalsy();
  });
});
