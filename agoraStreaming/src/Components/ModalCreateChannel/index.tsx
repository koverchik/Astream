import {useNavigation} from '@react-navigation/native';
import React, {FC, useState} from 'react';
import {View, Text, Modal, Pressable, TextInput} from 'react-native';
import {LiveType} from '../../Navigation/types';
import {StackNavigationPropNavigation} from '../../Screens/Home/types';
import {styles} from './style';
import {v4 as uuid} from 'uuid';
import {ModalCreateChannelType} from './types';

export const ModalCreateChannel: FC<ModalCreateChannelType> = (props) => {
  const coordinates = props.coordinates;

  const [modalVisible, setModalVisible] = useState(false);

  const [name, onChangeName] = React.useState('');
  const navigation = useNavigation<StackNavigationPropNavigation>();

  const createLive = () =>
    navigation.navigate('Live', {
      type: LiveType.CREATE,
      channelId: uuid(),
      name: name,
      coords: coordinates,
    });
  const pressStart = () => {
    setModalVisible(!modalVisible);
    onChangeName('');
    createLive();
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeName}
              placeholder="Name channel"
              value={name}
            />
            <Pressable style={styles.button} onPress={pressStart}>
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
