import {StyleSheet, Dimensions, ViewStyle, TextStyle} from 'react-native';

const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

type LifeScreenStyles = {
  container: ViewStyle;
  loadingText: TextStyle;
  fullscreen: ViewStyle;
};

export const styles = StyleSheet.create<LifeScreenStyles>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#222',
  },

  fullscreen: {
    width: dimensions.width,
    height: dimensions.height,
  },
});