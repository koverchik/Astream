import {TouchableWithoutFeedbackProps, ViewStyle} from 'react-native';

export type CalendarButtonPropsType = {
  onPress: TouchableWithoutFeedbackProps['onPress'];
  title: string;

  buttonsColor?: ViewStyle['backgroundColor'];
};
