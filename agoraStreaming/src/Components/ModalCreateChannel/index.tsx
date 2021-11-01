import {useNavigation} from '@react-navigation/native';
import React, {FC, useState} from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  SafeAreaView,
  TextInput,
} from 'react-native';
import {LiveType} from '../../Navigation/types';
import {StackNavigationPropNavigation} from '../../Screens/Home/types';
import {styles} from './style';
import {v4 as uuid} from 'uuid';
import {ModalCreateChannelType} from './types';

export const ModalCreateChannel: FC<ModalCreateChannelType> = props => {
  const coordinates = props.coordinates;

  const [modalVisible, setModalVisible] = useState(false);
  const [name, onChangeName] = React.useState('');
  const navigation = useNavigation<StackNavigationPropNavigation>();

  const createLive = () =>
    navigation.navigate('Live', {
      type: LiveType.CREATE,
      channel: uuid(),
      name: name,
      coords: coordinates,
    });

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
            <SafeAreaView style={styles.safeAreaView}>
              <TextInput
                style={styles.input}
                onChangeText={onChangeName}
                placeholder="Name channel"
                value={name}
              />
            </SafeAreaView>
            <Pressable
              style={styles.button}
              onPress={() => {
                setModalVisible(!modalVisible);
                onChangeName('');
                createLive();
              }}>
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
