import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type HeaderStyleType = {
  container: ViewStyle;
  title: TextStyle;
  wrapperSectionIcons: ViewStyle;
  wrapperIcon: ViewStyle;
};

const SIZE_BLOCKS_ITEM = 35;

export const styles = StyleSheet.create<HeaderStyleType>({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: 'white',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    borderRadius: SIZE_BLOCKS_ITEM / 2,
    height: SIZE_BLOCKS_ITEM,
    textAlign: 'center',
    textAlignVertical: 'center',
    flex: 1,
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
