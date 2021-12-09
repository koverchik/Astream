import {Dimensions, StyleSheet, TextStyle, ViewStyle} from 'react-native';

import {COLORS} from '../../Colors/colors';

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

const {BABY_BLUE_EYES, WHITE, SILVER_CHALICE, PORCELAIN, WILD_SAND} = COLORS;

export const styles = StyleSheet.create<StreamStylesType>({
  container: {
    backgroundColor: WILD_SAND,
    margin: 10,
    borderColor: PORCELAIN,
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
    backgroundColor: WHITE,
    borderRadius: AVATAR_SIZE / 2,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE,
  },
  type: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: STREAM_TYPE_SIZE,
    width: STREAM_TYPE_SIZE,
    borderRadius: STREAM_TYPE_SIZE / 2,
    backgroundColor: BABY_BLUE_EYES,
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
    backgroundColor: BABY_BLUE_EYES,
  },
  buttonText: {
    color: COLORS.AZURE_RADIANCE,
    fontSize: 10,
    fontWeight: 'bold',
  },
  time: {
    color: SILVER_CHALICE,
  },
  name: {
    fontWeight: 'bold',
  },
});
