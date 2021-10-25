import {LiveType} from '../../../Navigation/types';

export const isBroadcasterFunction = (param: string) => {
  return param === LiveType.CREATE;
};
