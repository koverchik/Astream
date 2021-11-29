import {TouchableWithoutFeedbackProps, ViewStyle} from 'react-native';

export type ChangeMonthButtonPropsType = {
  onPress: TouchableWithoutFeedbackProps['onPress'];
  title: string;

  buttonColor?: ViewStyle['backgroundColor'];
};
