import database from '@react-native-firebase/database';

import {ChannelFromFirebaseType} from '../../Home/types';

export const addNewChannelInDB = async (channel: ChannelFromFirebaseType) => {
  const {channelId, coords, isVideo, name} = channel;

  const newReference = database().ref(`/channels/${channelId}`);

  await newReference.set({
    name,
    channelId,
    coords,
    isVideo,
  });
};
