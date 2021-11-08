import database from '@react-native-firebase/database';
import {updateDataChannel} from './updateDataChannelUids';

export const addUserInArrayUidChannel = async (
  uid: number,
  channelId: string,
) => {
  const result = await database()
    .ref('/channels/')
    .once('value')
    .then(snapshot => {
      const allDataChannels = snapshot.val();
      for (let channel in allDataChannels) {
        if (allDataChannels[channel]['channelId'] === channelId) {
          const oldArrayUid = allDataChannels[channel]['uids'];
          let newArrayUid;
          if (allDataChannels[channel]['uids']) {
            newArrayUid = oldArrayUid.concat(uid);
          } else {
            newArrayUid = [uid];
          }
          updateDataChannel(channel, newArrayUid);
          return {
            uid,
            channel,
          };
        }
      }
    });
  return result;
};

export const deleteUserInArrayUidChannel = async (
  uid: number,
  channelId: string,
) => {
  await database()
    .ref('/channels/')
    .once('value')
    .then(snapshot => {
      const allDataChannels = snapshot.val();
      for (let channel in allDataChannels) {
        if (allDataChannels[channel]['channelId'] === channelId) {
          const arrayUid = allDataChannels[channel]['uids'];
          const index = arrayUid.indexOf(uid);
          if (index > -1) {
            arrayUid.splice(index, 1);
          }
          updateDataChannel(channel, arrayUid);
          return;
        }
      }
    });
};
