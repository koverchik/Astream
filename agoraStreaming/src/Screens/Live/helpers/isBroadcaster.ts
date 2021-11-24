import {LiveType} from '../../../Navigation/Tab/types';

export const isBroadcasterFunction = (param: string) => {
  return param === LiveType.CREATE;
};
