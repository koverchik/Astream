import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type HomeScreenStyles = {
  container: ViewStyle;
  title: TextStyle;
  createContainer: ViewStyle;
  joinContainer: ViewStyle;
  joinChannelInput: TextStyle;
  itemChannel: ViewStyle;
  buttonTextChannel: TextStyle;
  button: TextStyle;
  buttonText: TextStyle;
};

export const styles = StyleSheet.create<HomeScreenStyles>({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    marginBottom: 50,
    color: '#333',
  },
  createContainer: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  joinContainer: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    paddingTop: 50,
    borderTopWidth: 1,
    borderColor: '#22222255',
  },
  joinChannelInput: {
    backgroundColor: '#cccccc77',
    width: '100%',
    borderRadius: 8,
    paddingHorizontal: 20,
    fontSize: 17,
    textAlign: 'center',
  },
  itemChannel: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonTextChannel: {
    color: 'black',
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
});
