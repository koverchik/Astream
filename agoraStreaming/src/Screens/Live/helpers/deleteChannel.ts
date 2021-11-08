import database from '@react-native-firebase/database';

export const deleteChannel = async (dataChannelKey: string) => {
  await database().ref(`/channels/${dataChannelKey}`).remove();
};
