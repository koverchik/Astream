import {StyleSheet, ViewStyle} from 'react-native';

type HeaderStyleType = {
  container: ViewStyle;
  title: Text;
  wrapperSectionIcons: ViewStyle;
  wrapperIcon: ViewStyle;
};
export const styles = StyleSheet.create<HeaderStyleType>({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: 'white',
  },
  wrapperSectionIcons: {
    flexDirection: 'row',
  },
  wrapperIcon: {
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    borderRadius: 20,
    height: 35,
    width: 35,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
