import database from '@react-native-firebase/database';

export const findKeyDataInDatabase = async (
  channelId: string,
): Promise<string | void> => {
  const snapshot = await database().ref('/channels/').once('value');
  const allDataChannels = snapshot.val();
  for (const channel in allDataChannels) {
    if (allDataChannels[channel].channelId === channelId) {
      return channel;
    }
  }
};
