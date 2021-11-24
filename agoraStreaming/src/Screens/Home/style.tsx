import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type HomeScreenStyles = {
  container: ViewStyle;
  button: TextStyle;
  buttonText: TextStyle;
  map: ViewStyle;
  calloutStyle: ViewStyle;
  itemChannel: ViewStyle;
  background: ViewStyle;
  marker: ViewStyle;
};

export const SIZE_MARKER = 30;

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
  marker: {
    position: 'absolute',
    top: 2,
    left: 2,
    borderRadius: SIZE_MARKER / 2,
    width: SIZE_MARKER,
    height: SIZE_MARKER,
    overflow: 'hidden',
    backgroundColor: '#a5c5ec',
    flex: 1,
    borderWidth: 4,
    borderColor: 'rgba(165, 197, 236, .5)',
    alignItems: 'center',
    justifyContent: 'center',
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
  buttonText: {
    color: 'black',
    fontSize: 20,
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
