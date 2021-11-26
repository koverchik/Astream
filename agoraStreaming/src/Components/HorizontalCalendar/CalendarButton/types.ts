import {TouchableWithoutFeedbackProps} from 'react-native';

export type CalendarButtonPropsType = {
  onPress: TouchableWithoutFeedbackProps['onPress'];
  title: string;

  buttonsColor?: string;
};
