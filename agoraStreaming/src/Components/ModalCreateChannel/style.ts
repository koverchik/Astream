import {StyleSheet, ViewStyle, TextStyle, TextInput} from 'react-native';

type LifeScreenStyles = {
  centeredView: ViewStyle;
  button: ViewStyle;
  buttonText: TextStyle;
  modalView: ViewStyle;
  input: ViewStyle;
  safeAreaView: ViewStyle;
  buttonOpen: TextStyle;
  modalText: TextStyle;
  createContainer: ViewStyle;
};

export const styles = StyleSheet.create<LifeScreenStyles>({
  centeredView: {
    flex: 1,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  button: {
    width: '100%',
    marginTop: 15,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#78b0ff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
  modalView: {
    margin: 20,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  safeAreaView: {
    width: '100%',
  },
  input: {
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  createContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    width: 250,
    marginLeft: -40,
    zIndex: 1,
    marginBottom: 25,
  },
});
