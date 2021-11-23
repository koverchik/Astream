import {LiveType} from '../../../Navigation/Stack/types';

export const isBroadcasterFunction = (param: string) => {
  return param === LiveType.CREATE;
};
