import {StyleSheet, Dimensions, ViewStyle, TextStyle} from 'react-native';

const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

type LifeScreenStyles = {
  container: ViewStyle;
  loadingText: TextStyle;
  muteText: TextStyle;
  camera: ViewStyle;
  muteCamera: ViewStyle;
};

export const styles = StyleSheet.create<LifeScreenStyles>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#222',
  },
  muteCamera: {
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  muteText: {
    color: '#fff',
  },
});
