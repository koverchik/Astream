import {Dimensions, StyleSheet, TextStyle, ViewStyle} from 'react-native';

import {Colors} from '../../Colors/colors';

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

const {babyBlueEyes, white, silverChalice, porcelain, wildSand} = Colors;

export const styles = StyleSheet.create<StreamStylesType>({
  container: {
    backgroundColor: wildSand,
    margin: 10,
    borderColor: porcelain,
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
    backgroundColor: white,
    borderRadius: AVATAR_SIZE / 2,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: white,
  },
  type: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: STREAM_TYPE_SIZE,
    width: STREAM_TYPE_SIZE,
    borderRadius: STREAM_TYPE_SIZE / 2,
    backgroundColor: babyBlueEyes,
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
    backgroundColor: babyBlueEyes,
  },
  buttonText: {
    color: Colors.azureRadiance,
    fontSize: 10,
    fontWeight: 'bold',
  },
  time: {
    color: silverChalice,
  },
  name: {
    fontWeight: 'bold',
  },
});
