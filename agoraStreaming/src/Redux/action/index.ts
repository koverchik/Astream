import {StreamTypes} from '../reducer/types';
import {AddNameType, AddUidAndKeyDBType} from './types';

export const addName: AddNameType = payload => {
  return {
    type: StreamTypes.USER_NAME,
    payload,
  };
};

export const addUidAndKeyDB: AddUidAndKeyDBType = (uid, keyDatabases) => {
  return {
    type: StreamTypes.INFO_STREAM,
    payload: {uid, keyDatabases},
  };
};
