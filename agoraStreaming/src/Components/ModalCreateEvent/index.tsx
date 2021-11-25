import React, {FC, useState} from 'react';
import {
  Modal,
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

import database from '@react-native-firebase/database';

import {SwitchVideo} from '../SwitchVideo';
import {styles} from './style';
import {ModalCreatEventType} from './types';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

export const ModalCreatEvent: FC<ModalCreatEventType> = (props) => {
  const {day} = props;

  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  const [date, setDate] = useState(new Date());

  const changeModalVisible = () => setModalVisible(!isModalVisible);

  const newReference = database().ref(`/events/${day}`).push();

  const createEvent = async () => {
    await newReference.set({
      name,
      video: isEnabled,
      dateTime: date.toUTCString(),
    });
  };

  const pressStart = async () => {
    if (!name.trim()) {
      setError('Name is required field!');
    } else {
      changeModalVisible();
      setName('');
      await createEvent();
    }
  };
  const onChangeTitle = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setName(e.nativeEvent.text);
    setError('');
  };

  const onRequestClose = () => {
    setName('');
    setError('');
    changeModalVisible();
  };

  return (
    <View style={styles.wrapperAllModalView}>
      <Modal
        animationType="fade"
        transparent={false}
        visible={isModalVisible}
        onRequestClose={onRequestClose}>
        <View style={styles.wrapperModalView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={changeModalVisible}>
              <FontAwesomeIcon icon={faPlus} color={'white'} size={20} />
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
              <DatePicker
                date={date}
                mode="time"
                onDateChange={setDate}
                androidVariant={'iosClone'}
              />
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
      <View style={styles.addNewEvent}>
        <TouchableOpacity onPress={changeModalVisible}>
          <FontAwesomeIcon icon={faPlus} color={'white'} size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
