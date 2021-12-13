import database from '@react-native-firebase/database';

import {ChannelFromFirebaseType} from '../../Home/types';

const newReference = database().ref('/channels').push();

export const addNewChannelInDB = async (channel: ChannelFromFirebaseType) => {
  const {channelId, coords, isVideo, name} = channel;

  await newReference.set({
    name,
    channelId,
    coords,
    isVideo,
  });
};
