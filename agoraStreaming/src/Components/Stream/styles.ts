import {Dimensions, StyleSheet, TextStyle, ViewStyle} from 'react-native';

const {width} = Dimensions.get('window');

const AVATAR_SIZE = 50;
const STREAM_TYPE_SIZE = 20;

type StreamStylesType = {
  container: ViewStyle;
  avatar: ViewStyle;
  type: ViewStyle;
  avatarBox: ViewStyle;
  middleBox: ViewStyle;
  button: ViewStyle;
  buttonText: TextStyle;
  time: TextStyle;
  name: TextStyle;
};

export const styles = StyleSheet.create<StreamStylesType>({
  container: {
    backgroundColor: '#f6f8f8',
    margin: 10,
    borderColor: '#e8ecec',
    borderWidth: 1,
    flexDirection: 'row',
    width: width * 0.8,
    alignItems: 'center',
    height: 75,
    borderRadius: 10,
    padding: 10,
  },
  avatarBox: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE + 5,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#123',
  },
  type: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: STREAM_TYPE_SIZE,
    width: STREAM_TYPE_SIZE,
    borderRadius: STREAM_TYPE_SIZE / 2,
    backgroundColor: '#78adea',
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleBox: {
    flex: 1,
    height: '100%',
    marginHorizontal: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '70%',
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: '#9acee5',
  },
  buttonText: {
    color: '#2997dc',
    fontSize: 10,
    fontWeight: 'bold',
  },
  time: {
    color: '#b0b0b0',
  },
  name: {
    fontWeight: 'bold',
  },
});
