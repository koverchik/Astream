import {StyleSheet, Dimensions} from 'react-native';

const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

export const createStyles = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      fontSize: 18,
      color: '#222',
    },
    activityIndicator: {},
    fullscreen: {
      width: dimensions.width,
      height: dimensions.height,
    },
  });
  return styles;
};
