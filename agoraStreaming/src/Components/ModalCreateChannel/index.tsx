import {useNavigation} from '@react-navigation/native';
import React, {FC, useState} from 'react';
import {
  Modal,
  NativeSyntheticEvent,
  Pressable,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from 'react-native';
import {v4 as uuid} from 'uuid';

import {LiveType} from '../../Navigation/types';
import {StackNavigationPropNavigation} from '../../Screens/Home/types';
import {styles} from './style';
import {ModalCreateChannelType} from './types';

export const ModalCreateChannel: FC<ModalCreateChannelType> = (props) => {
  const coordinates = props.coordinates;

  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('channel');
  const [error, setError] = useState<string | null>(null);

  const navigation = useNavigation<StackNavigationPropNavigation>();

  const createLive = () => {
    navigation.navigate('Live', {
      type: LiveType.CREATE,
      channelId: uuid(),
      name: name,
      coords: coordinates,
    });
  };
  const pressStart = () => {
    if (!name.trim()) {
      setError('Channel name is required!');
    } else {
      setModalVisible(!modalVisible);
      setName('');
      createLive();
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
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.title}>Create new channel</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, !!error && styles.errorInput]}
                onChange={onChangeTitle}
                placeholder="Name channel"
                value={name}
              />
              {error && <Text style={styles.error}>{error}</Text>}
            </View>
            <Pressable
              style={[styles.button, !!error && styles.buttonDisabled]}
              onPress={pressStart}
              disabled={!!error}
            >
              <Text style={styles.buttonText}>Start</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={styles.createContainer}>
        <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Create channel</Text>
        </Pressable>
      </View>
    </View>
  );
};
