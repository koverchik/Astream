import database from '@react-native-firebase/database';
import {updateDataChannel} from './updateDataChannelUids';

export const newArrayUidChannel = (uid: number, channelId: string) => {
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
