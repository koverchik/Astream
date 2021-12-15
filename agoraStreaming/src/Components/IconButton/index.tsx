import React, {FC} from 'react';
import {TouchableOpacity} from 'react-native';

import {IconButtonPropsType} from './types';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

export const IconButton: FC<IconButtonPropsType> = (props) => {
  const {icon, color, size, onPress, style, activeOpacity, ...restProps} =
    props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={style}
      activeOpacity={activeOpacity}
      {...restProps}>
      <FontAwesomeIcon icon={icon} color={color} size={size} />
    </TouchableOpacity>
  );
};
