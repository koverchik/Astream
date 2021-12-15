import {TouchableOpacityProps} from 'react-native';

import {Props} from '@fortawesome/react-native-fontawesome';

export type FontAwesomeIconPropsType = Pick<Props, 'icon' | 'color' | 'size'>;

export type IconButtonPropsType = FontAwesomeIconPropsType &
  TouchableOpacityProps;
