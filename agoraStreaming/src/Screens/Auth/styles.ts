import {StyleSheet, ViewStyle} from 'react-native';

type AuthScreenStylesType = {
  container: ViewStyle;
  button: ViewStyle;
};

export const styles = StyleSheet.create<AuthScreenStylesType>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 192,
    height: 48,
  },
});
