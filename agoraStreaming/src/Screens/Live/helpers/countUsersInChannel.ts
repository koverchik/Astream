import database from '@react-native-firebase/database';
import {deleteChannel} from './deleteChannel';

export const countUsersInChannel = async (dataChannelKey: string) => {
  await database()
    .ref(`/channels/${dataChannelKey}`)
    .once('value')
    .then(snapshot => {
      const dataChannel = snapshot.val();
      console.log(dataChannel);

      //   if (dataChannel['uids'].length === 0) {
      //     deleteChannel(dataChannelKey);
      //   }
    });
};
