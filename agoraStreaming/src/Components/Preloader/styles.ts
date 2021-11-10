import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type PreloaderStylesType = {
  loadingText: TextStyle;
  container: ViewStyle;
};

export const styles = StyleSheet.create<PreloaderStylesType>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#222',
  },
});
