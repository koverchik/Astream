import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';

type HomeScreenStyles = {
  container: ViewStyle;
  button: TextStyle;
  markerText: TextStyle;
  buttonText: TextStyle;
  map: ViewStyle;
  calloutStyle: ViewStyle;
  itemChannel: ViewStyle;
  background: ViewStyle;
  logout: ViewStyle;
  marker: ViewStyle;
  createContainer: ViewStyle;
  headerContainer: ViewStyle;
  markerImage: ImageStyle;
};

const SIZE_MARKER = 30;
const BORDER_SIZE = 4;
export const CORNERS_RADIUS = 35;

export const styles = StyleSheet.create<HomeScreenStyles>({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
    borderBottomEndRadius: CORNERS_RADIUS,
    borderBottomStartRadius: CORNERS_RADIUS,
    overflow: 'hidden',
    alignItems: 'center',
  },
  headerContainer: {
    position: 'absolute',
    zIndex: 1,
  },
  marker: {
    position: 'absolute',
    top: BORDER_SIZE / 2,
    left: BORDER_SIZE / 2,
    borderRadius: SIZE_MARKER / 2,
    width: SIZE_MARKER,
    height: SIZE_MARKER,
    overflow: 'hidden',
    backgroundColor: '#a5c5ec',
    flex: 1,
    borderWidth: BORDER_SIZE,
    borderColor: 'rgba(165, 197, 236, .5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerImage: {
    height: SIZE_MARKER - 15,
    width: SIZE_MARKER - 15,
  },
  background: {
    flex: 1,
    backgroundColor: '#000',
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
  markerText: {
    color: '#000000',
    fontSize: 16,
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
  createContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 15,
    width: 250,
  },
  button: {
    width: 250,
    marginTop: 15,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#FF7070',
  },
});
