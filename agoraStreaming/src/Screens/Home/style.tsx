import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type HomeScreenStyles = {
  container: ViewStyle;
  button: TextStyle;
  buttonText: TextStyle;
  map: ViewStyle;
  calloutStyle: ViewStyle;
  itemChannel: ViewStyle;
  background: ViewStyle;
  logout: ViewStyle;
};

export const styles = StyleSheet.create<HomeScreenStyles>({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
    borderBottomEndRadius: 35,
    borderBottomStartRadius: 35,
    overflow: 'hidden',
  },
  background: {
    flex: 1,
    backgroundColor: '#000',
  },
  button: {
    width: '100%',
    marginTop: 15,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF7070',
  },
  logout: {
    width: 80,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF7070',
    position: 'absolute',
    top: 10,
    right: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  itemChannel: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
  },
  calloutStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
