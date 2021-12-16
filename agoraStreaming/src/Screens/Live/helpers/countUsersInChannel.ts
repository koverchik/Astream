import database from '@react-native-firebase/database';

import {deleteChannel} from './deleteChannel';

export const countUsersInChannel = async (dataChannelKey: string) => {
  const snapshot = await database()
    .ref(`/channels/${dataChannelKey}`)
    .once('value');
  const dataChannel = snapshot.val();

  if (dataChannel.uids.length === 0) {
    await deleteChannel(dataChannelKey);
  }
};
