import {Dimensions, StyleSheet, TextStyle, ViewStyle} from 'react-native';

type DayStylesType = {
  container: ViewStyle;
  containerActive: ViewStyle;
  day: TextStyle;
  date: TextStyle;
  text: TextStyle;
  textActive: TextStyle;
};

const {width} = Dimensions.get('window');

export const styles = StyleSheet.create<DayStylesType>({
  container: {
    borderBottomColor: 'transparent',
    borderBottomWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    height: 65,
    width: width / 7,
  },
  containerActive: {
    borderBottomColor: '#a975d9',
  },
  day: {
    fontSize: 12,
  },
  date: {
    fontSize: 20,
  },
  text: {
    color: '#000',
    textAlign: 'center',
  },
  textActive: {
    color: '#a975d9',
  },
});
