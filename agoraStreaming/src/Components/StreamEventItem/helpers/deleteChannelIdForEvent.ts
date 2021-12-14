import database from '@react-native-firebase/database';

export const deleteChannelIdForEvent = async (
  eventDate: string,
  eventId: string,
) => {
  await database().ref(`/events/${eventDate}/${eventId}/channelId`).remove();
};
