import {LatLng} from 'react-native-maps';

import {useNavigation} from '@react-navigation/native';

import database from '@react-native-firebase/database';

import {LiveType, MainStackScreens} from '../../../Navigation/Stack/types';
import {StreamType} from '../../../Screens/Calendar/types';
import {addNewChannelInDB} from '../../../Screens/Live/helpers/addNewChannelInDB';
import {StackNavigationPropLive} from '../../../Screens/Live/types';

export const onPressEventButton = async (stream: StreamType, geo: LatLng) => {
  const {channelId, eventId, isVideo, name, chosenDay} = stream;

  const newReference = database().ref(`/events/${chosenDay}/${eventId}`);
  const navigation = useNavigation<StackNavigationPropLive>();

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
      coords: geo,
      isVideo,
      name,
    });

    await addNewChannelInDB({
      name,
      channelId: eventId,
      isVideo,
      coords: geo,
    });

    await newReference.update({channelId: eventId});
  }
};
