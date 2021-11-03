import {StyleSheet, Dimensions, ViewStyle, TextStyle} from 'react-native';

const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

type LifeScreenStyles = {
  container: ViewStyle;
  loadingText: TextStyle;
  fullscreen: ViewStyle;
  usersScreen: ViewStyle;
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
    flex: 1,
    width: '100%',
    height: '100%',
  },
  usersScreen: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
