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

    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: 'white',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    borderRadius: 20,
    height: 35,
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
    borderRadius: 20,
    height: 35,
    width: 35,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
