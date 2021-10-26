import {StyleSheet, Dimensions, ViewStyle, TextStyle} from 'react-native';

type LifeScreenStyles = {
  container: ViewStyle;
  itemChannel: ViewStyle;
  buttonTextChannel: TextStyle;
};

export const styles = StyleSheet.create<LifeScreenStyles>({
  container: {
    flex: 1,
    marginTop: 20,
  },
  itemChannel: {
    padding: 10,
    backgroundColor: 'pink',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 15,
  },
  buttonTextChannel: {
    color: 'black',
  },
});
