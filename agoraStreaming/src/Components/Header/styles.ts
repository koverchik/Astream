import {
  ImageStyle,
  ScaledSize,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';

type HeaderStyleType = {
  container: ViewStyle;
  title: TextStyle;
  titleContainer: ViewStyle;
  wrapperSectionIcons: ViewStyle;
  wrapperIcon: ViewStyle;
  image: ImageStyle;
  input: ViewStyle;
  inputContainer: ViewStyle;
};

export const SIZE_BLOCKS_ITEM = 35;
export const MARGIN = 5;

export const HeaderStyles = (width: ScaledSize['width']) => {
  return StyleSheet.create<HeaderStyleType>({
    container: {
      width,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    titleContainer: {
      backgroundColor: 'rgba(52, 52, 52, 0.8)',
      borderRadius: SIZE_BLOCKS_ITEM / 2,
      height: SIZE_BLOCKS_ITEM,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    title: {
      color: 'white',
    },
    wrapperSectionIcons: {
      flexDirection: 'row',
      margin: MARGIN,
    },
    wrapperIcon: {
      backgroundColor: 'rgba(52, 52, 52, 0.8)',
      borderRadius: SIZE_BLOCKS_ITEM / 2,
      height: SIZE_BLOCKS_ITEM,
      width: SIZE_BLOCKS_ITEM,
      margin: MARGIN,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      borderRadius: SIZE_BLOCKS_ITEM / 2,
      height: SIZE_BLOCKS_ITEM,
      width: SIZE_BLOCKS_ITEM,
    },
    inputContainer: {
      position: 'absolute',
      left: 10,
    },
    input: {
      paddingLeft: 10,
      height: SIZE_BLOCKS_ITEM,
      borderRadius: SIZE_BLOCKS_ITEM / 2,
      backgroundColor: 'rgba(52, 52, 52, 1)',
      color: '#fff',
    },
  });
};
