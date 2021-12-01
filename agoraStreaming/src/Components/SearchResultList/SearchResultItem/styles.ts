import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type FoundStreamItemStylesType = {
  container: ViewStyle;
  text: TextStyle;
};

export const styles = StyleSheet.create<FoundStreamItemStylesType>({
  container: {
    height: 40,
    backgroundColor: '#282727',
    marginBottom: 5,
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  text: {
    color: '#fff',
  },
});
