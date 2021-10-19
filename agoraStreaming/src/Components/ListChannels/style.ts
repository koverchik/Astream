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
    marginBottom: 15,
  },
  buttonTextChannel: {
    color: 'black',
  },
});
