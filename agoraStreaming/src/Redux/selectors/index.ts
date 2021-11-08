import {RootState} from '../store';

export const getStream = (store: RootState) => {
  return store.stream;
};
