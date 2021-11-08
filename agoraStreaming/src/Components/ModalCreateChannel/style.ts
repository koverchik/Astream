import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type LifeScreenStyles = {
  centeredView: ViewStyle;
  button: ViewStyle;
  buttonText: TextStyle;
  modalView: ViewStyle;
  input: ViewStyle;
  createContainer: ViewStyle;
};

export const styles = StyleSheet.create<LifeScreenStyles>({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  button: {
    width: '100%',
    marginTop: 15,
    borderRadius: 8,
    paddingVertical: 7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF7070',
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
  input: {
    height: 40,
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
  },
  createContainer: {
    position: 'absolute',
    left: 50,
    top: -25,
    width: 250,
  },
});
