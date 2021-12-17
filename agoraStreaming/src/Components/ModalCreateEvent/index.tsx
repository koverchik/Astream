import React, {FC, useEffect, useState} from 'react';
import {Modal, Text, TextInput, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {log, useEvent} from 'react-native-reanimated';

import {useNavigation} from '@react-navigation/native';

import database from '@react-native-firebase/database';

import {COLORS} from '../../Colors/colors';
import {LiveType, MainStackScreens} from '../../Navigation/Stack/types';
import {StackNavigationPropLive} from '../../Screens/Live/types';
import {InputEventType} from '../../Types/universalTypes';
import {SwitchVideo} from '../SwitchVideo';
import {remoteConfigTypeStream} from './helper';
import {styles} from './style';
import {ModalCreatEventType} from './types';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {v4 as uuid} from 'uuid';

export const ModalCreatEvent: FC<ModalCreatEventType> = (props) => {
  const {day, changeModalVisible, isModalVisible, coordinates} = props;

  const [name, setName] = useState<string>('');
  const [error, setError] = useState<string>('');

  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  useEffect(() => {
    if (isModalVisible) {
      remoteConfigTypeStream('type_stream').then((data) => {
        setIsEnabled(data);
      });
    }
  }, [isModalVisible]);

  const [date, setDate] = useState(new Date());

  const newReference = database().ref(`/events/${day}`).push();

  const navigation = useNavigation<StackNavigationPropLive>();

  const createLive = () => {
    navigation.navigate(MainStackScreens.Live, {
      type: LiveType.CREATE,
      channelId: uuid(),
      coords: coordinates,
      isVideo: isEnabled,
      name,
    });
  };

  const createEvent = async () => {
    await newReference.set({
      name,
      video: isEnabled,
      dateTime: date.toUTCString(),
      eventIsOver: false,
    });
  };

  const closeModal = () => {
    changeModalVisible();
    setError('');
  };

  const pressStart = async () => {
    if (!name.trim()) {
      setError('Name is required field!');
    } else {
      closeModal();
      setName('');
      coordinates ? createLive() : await createEvent();
    }
  };

  const onChangeTitle = (event: InputEventType) => {
    setName(event.nativeEvent.text);
    setError('');
  };

  const onRequestClose = () => {
    setName('');
    setError('');
    changeModalVisible();
  };

  return (
    <Modal
      style={styles.wrapperAllModalView}
      animationType="fade"
      transparent={false}
      visible={isModalVisible}
      onRequestClose={onRequestClose}>
      <View style={styles.wrapperModalView}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <FontAwesomeIcon icon={faPlus} color={COLORS.WHITE} size={20} />
          </TouchableOpacity>
          <Text style={styles.title}>Create new event</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, !!error && styles.errorInput]}
              onChange={onChangeTitle}
              placeholder="Name event"
              value={name}
            />
            {!!error && <Text style={styles.error}>{error}</Text>}
            <SwitchVideo setIsEnabled={setIsEnabled} isEnabled={isEnabled} />
            {!coordinates && (
              <DatePicker
                date={date}
                mode="time"
                onDateChange={setDate}
                androidVariant={'iosClone'}
              />
            )}
          </View>
          <TouchableOpacity
            style={[styles.button, !!error && styles.buttonDisabled]}
            onPress={pressStart}
            disabled={!!error}>
            <Text style={styles.buttonText}>Create</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
