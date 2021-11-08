import database from '@react-native-firebase/database';

export const findKeyDataInDatabase = async (channelId: string) => {
  const result = await database()
    .ref('/channels/')
    .once('value')
    .then((snapshot) => {
      const allDataChannels = snapshot.val();
      for (let channel in allDataChannels) {
        if (allDataChannels[channel].channelId === channelId) {
          return channel;
        }
      }
    });
  return result;
};
