import {StyleSheet, Dimensions, ViewStyle, TextStyle} from 'react-native';

const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

type LifeScreenStyles = {
  container: ViewStyle;
  loadingText: TextStyle;
  localScreen: ViewStyle;
  userScreen: ViewStyle;
  userContainer: ViewStyle;
  localContainer: ViewStyle;
};

export const styles = StyleSheet.create<LifeScreenStyles>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  localContainer: {
    flex: 1,
    width: '100%',
  },
  localScreen: {
    flex: 1,
    width: '100%',
  },
  userContainer: {
    flex: 1,
    width: '100%',
  },
  userScreen: {
    flex: 1,
    width: '100%',
  },
  loadingText: {
    fontSize: 18,
    color: '#222',
  },
});
