import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

type UserNameLAbelType = {
  userName: TextStyle;
  userNameContainer: ViewStyle;
};

export const styles = StyleSheet.create<UserNameLAbelType>({
  userNameContainer: {
    backgroundColor: '#5ebf9d',
    height: 40,
    minWidth: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    position: 'absolute',
    top: 20,
    left: 20,
  },
  userName: {
    fontSize: 16,
    color: '#fff',
  },
});
