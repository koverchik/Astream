import React, {FC} from 'react';
import Svg, {Path} from 'react-native-svg';
import {TabIconPropsType} from './types';

export const CircleSvg: FC<TabIconPropsType> = (props) => {
  const {color, size} = props;

  return (
    <Svg viewBox="0 0 16 16" width={size} height={size} fill={color}>
      <Path
        d="M8,0C3.582,0,0,3.582,0,8s3.582,8,8,8s8-3.582,8-8S12.418,0,8,0z M8,15c-3.866,0-7-3.134-7-7
    s3.134-7,7-7s7,3.134,7,7S11.866,15,8,15z"
      />
    </Svg>
  );
};
