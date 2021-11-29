import {Dimensions, StyleSheet, TextStyle, ViewStyle} from 'react-native';

type HeaderStyleType = {
  container: ViewStyle;
  title: TextStyle;
  titleContainer: ViewStyle;
  wrapperSectionIcons: ViewStyle;
  wrapperIcon: ViewStyle;
};

const SIZE_BLOCKS_ITEM = 35;

const {width} = Dimensions.get('window');

export const styles = StyleSheet.create<HeaderStyleType>({
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
    margin: 5,
  },
  wrapperIcon: {
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    borderRadius: SIZE_BLOCKS_ITEM / 2,
    height: SIZE_BLOCKS_ITEM,
    width: SIZE_BLOCKS_ITEM,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
