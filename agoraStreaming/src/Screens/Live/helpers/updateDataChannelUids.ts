import database from '@react-native-firebase/database';

export const updateDataChannel = (
  dataChannelKey: string,
  uidNewUser: number[],
) => {
  database()
    .ref(`/channels/${dataChannelKey}`)
    .update({
      uids: uidNewUser,
    })
    .then(() => console.log('Data updated.'));
};
