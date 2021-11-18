import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {FC, useState} from 'react';
import {
  Modal,
  NativeSyntheticEvent,
  Pressable,
  Switch,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

import {styles} from './style';

export const ModalCreatEvent: FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('event');
  const [error, setError] = useState<string | null>(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [date, setDate] = useState(new Date());

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const createEvent = () => {
    // TODO: Space for function which create new entry into the database
  };
  const pressStart = () => {
    if (!name.trim()) {
      setError('Name is required field!');
    } else {
      setModalVisible(!modalVisible);
      setName('');
      createEvent();
    }
  };
  const onChangeTitle = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setName(e.nativeEvent.text);
    setError(null);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setName('');
          setError(null);
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <FontAwesomeIcon icon={faPlus} color={'white'} size={20} />
            </Pressable>
            <Text style={styles.title}>Create new event</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, !!error && styles.errorInput]}
                onChange={onChangeTitle}
                placeholder="Name event"
                value={name}
              />
              {error && <Text style={styles.error}>{error}</Text>}
              <View style={styles.wrapperView}>
                <Text> Video</Text>
                <Switch
                  trackColor={{false: '#767577', true: '#81b0ff'}}
                  thumbColor={isEnabled ? '#FF7070' : '#f4f3f4'}
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>
              <DatePicker date={date} mode="time" onDateChange={setDate} />
            </View>
            <Pressable
              style={[styles.button, !!error && styles.buttonDisabled]}
              onPress={pressStart}
              disabled={!!error}>
              <Text style={styles.buttonText}>Create</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={styles.createContainer}>
        <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
          <FontAwesomeIcon icon={faPlus} color={'white'} size={18} />
        </Pressable>
      </View>
    </View>
  );
};
