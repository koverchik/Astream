import database from '@react-native-firebase/database';
import {updateDataChannel} from './updateDataChannelUids';

export const addUserInArrayUidChannel = (uid: number, channelId: string) => {
  database()
    .ref('/channels/')
    .once('value')
    .then(snapshot => {
      const allDataChannels = snapshot.val();
      for (let channel in allDataChannels) {
        if (allDataChannels[channel]['channelId'] === channelId) {
          const oldArrayUid = allDataChannels[channel]['uids'];
          const newArrayUid = oldArrayUid.concat(uid);
          updateDataChannel(channel, newArrayUid);
          return;
        }
      }
    });
};

export const deleteUserInArrayUidChannel = (uid: number, channelId: string) => {
  database()
    .ref('/channels/')
    .once('value')
    .then(snapshot => {
      const allDataChannels = snapshot.val();
      for (let channel in allDataChannels) {
        if (allDataChannels[channel]['channelId'] === channelId) {
          const arrayUid = allDataChannels[channel]['uids'];
          console.log(arrayUid);
          const index = arrayUid.indexOf(uid);

          if (index > -1) {
            arrayUid.splice(index, 1);
          }
          console.log(arrayUid);
          updateDataChannel(channel, arrayUid);
        }
      }
    });
};
