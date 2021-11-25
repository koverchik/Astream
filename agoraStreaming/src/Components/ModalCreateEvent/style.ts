import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type LifeScreenStyles = {
  wrapperAllModalView: ViewStyle;
  button: ViewStyle;
  closeButton: ViewStyle;
  buttonText: TextStyle;
  title: TextStyle;
  error: TextStyle;
  wrapperView: ViewStyle;
  modalView: ViewStyle;
  input: ViewStyle;
  errorInput: ViewStyle;
  addNewEvent: ViewStyle;
  wrapperModalView: ViewStyle;
  buttonDisabled: ViewStyle;
  inputContainer: ViewStyle;
};
const SIZE_CLOSE_BUTTON = 30;

export const styles = StyleSheet.create<LifeScreenStyles>({
  wrapperAllModalView: {
    margin: 20,
  },
  wrapperModalView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    paddingBottom: 50,
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
  title: {
    color: '#FF7070',
    fontSize: 20,
    marginBottom: 25,
  },
  wrapperView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 5,
  },
  button: {
    alignContent: 'space-between',
    width: '100%',
    marginTop: 15,
    borderRadius: 8,
    paddingVertical: 7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF7070',
  },
  closeButton: {
    borderRadius: SIZE_CLOSE_BUTTON / 2,
    transform: [{rotate: '45deg'}, {translateX: 0}, {translateY: -25}],
    width: SIZE_CLOSE_BUTTON,
    height: SIZE_CLOSE_BUTTON,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF7070',
  },
  buttonDisabled: {
    backgroundColor: '#b2b2b2',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
  inputContainer: {
    width: '100%',
  },
  error: {
    margin: 5,
    color: '#FF7070',
  },
  input: {
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  errorInput: {
    borderColor: '#FF7070',
  },
  addNewEvent: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF7070',
    width: SIZE_CLOSE_BUTTON,
    height: SIZE_CLOSE_BUTTON,
    borderRadius: 8,
  },
});
