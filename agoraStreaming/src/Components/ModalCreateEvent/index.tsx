import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import database from '@react-native-firebase/database';
import React, {FC, useState} from 'react';
import {
  Modal,
  NativeSyntheticEvent,
  Switch,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

import {styles} from './style';
import {ModalCreatEventType} from './types';

export const ModalCreatEvent: FC<ModalCreatEventType> = (props) => {
  const {day} = props;

  const [isModalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('event');
  const [error, setError] = useState<string>('');
  const [isEnabled, setIsEnabled] = useState(false);

  const [date, setDate] = useState(new Date());

  const changeModalVisible = () => setModalVisible(!isModalVisible);

  const newReference = database().ref(`/events/${day}`).push();

  const createEvent = async () => {
    await newReference.set({
      name,
      video: isEnabled,
      dateTime: date,
    });
  };

  const pressStart = () => {
    if (!name.trim()) {
      setError('Name is required field!');
    } else {
      changeModalVisible();
      setName('');
      createEvent();
    }
  };
  const onChangeTitle = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setName(e.nativeEvent.text);
    setError('');
  };

  return (
    <View style={styles.wrapperAllModalView}>
      <Modal
        animationType="fade"
        transparent={false}
        visible={isModalVisible}
        onRequestClose={() => {
          setName('');
          setError('');
          changeModalVisible();
        }}>
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
              <View style={styles.wrapperView}>
                <Text>Video</Text>
                <Switch
                  trackColor={{false: '#767577', true: '#81b0ff'}}
                  thumbColor={isEnabled ? '#FF7070' : '#f4f3f4'}
                  onValueChange={setIsEnabled}
                  value={isEnabled}
                />
              </View>
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
