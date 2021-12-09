import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

import {Colors} from '../../Colors/colors';

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
    color: Colors.mineShaft,
  },
});
