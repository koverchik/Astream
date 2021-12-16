import database from '@react-native-firebase/database';

export const deleteChannelIdForEvent = async (
  eventDate: string,
  eventId: string,
) => {
  const baseAddress = `/events/${eventDate}/${eventId}`;
  const removeId = database().ref(`${baseAddress}/channelId`).remove();
  const endStream = database().ref(baseAddress).update({eventIsOver: true});

  await Promise.all([removeId, endStream]);
};
