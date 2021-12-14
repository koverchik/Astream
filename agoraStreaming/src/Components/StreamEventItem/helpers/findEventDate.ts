import database from '@react-native-firebase/database';

export const findEventDate = async (
  channelId: string,
): Promise<string | void> => {
  const snapshot = await database().ref(`/events`).once('value');
  const events = snapshot.val();
  for (const date in events) {
    const eventIds = Object.keys(events[date]);
    const id = eventIds.find((id) => id === channelId);
    if (id) {
      return date;
    }
  }
};
