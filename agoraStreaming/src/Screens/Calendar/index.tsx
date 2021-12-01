import React, {FC, useEffect, useLayoutEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';

import {getHeaderTitle} from '@react-navigation/elements';
import {useNavigation} from '@react-navigation/native';

import database from '@react-native-firebase/database';

import notifee from '@notifee/react-native';

import {CustomHeader} from '../../Components/Header';
import {HorizontalCalendar} from '../../Components/HorizontalCalendar';
import {DateInfoType} from '../../Components/HorizontalCalendar/types';
import {ModalCreatEvent} from '../../Components/ModalCreateEvent';
import {EventInDatabases} from '../../Components/ModalCreateEvent/types';
import {Stream} from '../../Components/Stream';
import {HeaderInputPlaceholders} from '../../Navigation/Tab/types';
import {useAppSelector} from '../../Redux/hooks';
import {selectChannelsList} from '../../Redux/selectors/HomeSelectors';
import {arrayListData} from './helpers/arrayListData';
import {
  TIME_NOTIFICATION,
  onCreateTriggerNotification,
} from './helpers/onCreateTriggerNotification';
import {styles} from './styles';
import {
  CalendarScreenProps,
  StreamType,
  TabNavigationPropsProfileType,
} from './types';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

export const ScreenCalendar: FC<CalendarScreenProps> = () => {
  const navigation = useNavigation<TabNavigationPropsProfileType>();
  const channelsList = useAppSelector(selectChannelsList);

  const dataSystem = new Date();

  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [streams, setStreams] = useState<StreamType[]>([]);
  const [chosenDay, setChoseDay] = useState(
    `${dataSystem.getFullYear()}-${
      dataSystem.getMonth() + 1
    }-${dataSystem.getDate()}`,
  );

  const changeModalVisible = () => setModalVisible(!isModalVisible);
  const selectDay = (date: DateInfoType) => {
    setChoseDay(`${date.year}-${date.month}-${date.day}`);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      header: ({route, options}) => {
        const title = getHeaderTitle(options, route.name);
        return (
          <CustomHeader
            title={title}
            placeholderText={HeaderInputPlaceholders.CALENDAR}
            listForSearching={channelsList}
          />
        );
      },
    });
  }, [navigation]);

  useEffect(() => {
    database()
      .ref(`/events/${chosenDay}`)
      .on('value', (snapshot) => {
        const data: EventInDatabases[] = snapshot.val();
        data !== null ? setStreams(arrayListData(data)) : setStreams([]);
      });
  }, [chosenDay]);

  useEffect(() => {
    database()
      .ref(`/events/${chosenDay}`)
      .on('value', (snapshot) => {
        const data: EventInDatabases[] = snapshot.val();
        notifee.getTriggerNotificationIds().then((ids) => {
          if (data !== null) {
            for (const key in data) {
              const dateTimeNotification =
                Date.parse(data[key].dateTime) - TIME_NOTIFICATION;
              if (
                Date.now() < dateTimeNotification &&
                ids.indexOf(key) === -1
              ) {
                onCreateTriggerNotification(
                  data[key].dateTime,
                  data[key].name,
                  key,
                );
              }
            }
          }
        });
      });
  }, []);

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={changeModalVisible}
          style={styles.addNewEvent}>
          <FontAwesomeIcon icon={faPlus} color={'white'} size={18} />
        </TouchableOpacity>
        <View style={{marginTop: 50}}>
          <HorizontalCalendar
            onDayPress={selectDay}
            activeDayColor={'#007eff'}
          />
        </View>
        <ModalCreatEvent
          day={chosenDay}
          changeModalVisible={changeModalVisible}
          isModalVisible={isModalVisible}
        />
        <FlatList
          data={streams}
          style={styles.flatList}
          renderItem={({item}) => <Stream stream={item} />}
          keyExtractor={(item) => 'Stream' + item.id}
          contentContainerStyle={[
            styles.flatListContent,
            !streams.length && styles.flatListContentCenter,
          ]}
          ListEmptyComponent={<Text>No scheduled streams</Text>}
        />
      </View>
    </View>
  );
};
