import {StreamTypes} from '../reducer/types';

export type AddNameType = (payload: string) => {
  type: StreamTypes.USER_NAME;
  payload: string;
};

export type AddUidAndKeyDBType = (
  uid: number,
  keyDatabases: string,
) => {
  type: StreamTypes.INFO_STREAM;
  payload: {uid: number; keyDatabases: string};
};
export type ActionUser = AddNameActionType | AddUidAndKeyDBActionType;

export type AddNameActionType = {
  type: StreamTypes.USER_NAME;
  payload: {name: string};
};

export type AddUidAndKeyDBActionType = {
  type: StreamTypes.INFO_STREAM;
  payload: {uid: number; keyDatabases: string};
};
