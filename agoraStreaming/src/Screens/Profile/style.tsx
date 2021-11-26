import {ImageStyle, StyleSheet, ViewStyle} from 'react-native';

type HomeScreenStyles = {
  container: ViewStyle;
  wrapperProfile: ViewStyle;
  button: ViewStyle;
  profile: ViewStyle;
  imageUser: ImageStyle;
};

const SIZE_ICON_USER = 60;

export const styles = StyleSheet.create<HomeScreenStyles>({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  wrapperProfile: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  profile: {
    flex: 1,
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'pink',
    borderRadius: SIZE_ICON_USER / 2,
    margin: 20,
    padding: 10,
  },
  imageUser: {
    backgroundColor: '#ffffff',
    height: SIZE_ICON_USER,
    width: SIZE_ICON_USER,
    borderRadius: SIZE_ICON_USER / 2,
  },
  button: {
    alignItems: 'center',
    width: 150,
    padding: 15,
    backgroundColor: '#81b0ff',
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 8,
  },
});
