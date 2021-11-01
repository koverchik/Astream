import React, {FC, useState} from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  SafeAreaView,
  TextInput,
} from 'react-native';
import {styles} from './style';

export const ModalCreateChannel = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [text, onChangeText] = React.useState('');
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
                onChangeText={onChangeText}
                placeholder="Name channel"
                value={text}
              />
            </SafeAreaView>
            <Pressable
              style={styles.button}
              onPress={() => setModalVisible(!modalVisible)}>
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
