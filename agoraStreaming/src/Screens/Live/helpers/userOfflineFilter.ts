import {UserType} from '../types';

export const userOfflineFilter = (users: UserType[], uid: number) => {
  return users.filter((userData) => userData.uid !== uid);
};
