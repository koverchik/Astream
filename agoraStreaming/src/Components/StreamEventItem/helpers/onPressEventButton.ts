import {LatLng} from 'react-native-maps';

import database from '@react-native-firebase/database';

import {LiveType, MainStackScreens} from '../../../Navigation/Stack/types';
import {StreamType} from '../../../Screens/Calendar/types';
import {addNewChannelInDB} from '../../../Screens/Live/helpers/addNewChannelInDB';
import {StackNavigationPropLive} from '../../../Screens/Live/types';

export const onPressEventButton = async (
  stream: StreamType,
  geolocation: LatLng,
  navigation: StackNavigationPropLive,
) => {
  const {channelId, eventId, isVideo, name, chosenDay} = stream;

  const newReference = database().ref(`/events/${chosenDay}/${eventId}`);

  if (channelId) {
    navigation.navigate(MainStackScreens.Live, {
      type: LiveType.JOIN,
      channelId,
      isVideo,
    });
  } else {
    navigation.navigate(MainStackScreens.Live, {
      type: LiveType.CREATE,
      channelId: eventId,
      coords: geolocation,
      isVideo,
      name,
    });

    await addNewChannelInDB({
      name,
      channelId: eventId,
      isVideo,
      coords: geolocation,
    });

    await newReference.update({channelId: eventId});
  }
};
