import React, {FC} from 'react';
import Svg, {Path} from 'react-native-svg';

import {TabIconPropsType} from './types';

export const DiscoverSvg: FC<TabIconPropsType> = (props) => {
  const {color, size} = props;

  return (
    <Svg width={size} height={size} viewBox="0 0 14 14" fill={color}>
      <Path d="M 1,6.249111 H 6.25031 V 1 H 1 V 6.249111 z M 7.74969,1 V 6.249111 H 13 V 1 H 7.74969 z m 0,12 H 13 V 7.750444 H 7.74969 V 13 z M 1,13 H 6.25031 V 7.750444 H 1 V 13 z" />
    </Svg>
  );
};
