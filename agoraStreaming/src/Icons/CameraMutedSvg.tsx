import React, {FC} from 'react';
import Svg, {Path} from 'react-native-svg';
import {CameraMutePropsType} from './types';

export const CameraMutedSvg: FC<CameraMutePropsType> = (props) => {
  const {fill, size} = props;
  return (
    <Svg
      width={size ?? '60%'}
      height={size ?? '60%'}
      fill={fill ?? '#000'}
      viewBox="0 0 16 16">
      <Path
        fill-rule="evenodd"
        d="M10.961 12.365a1.99 1.99 0 0 0 .522-1.103l3.11 1.382A1 1 0 0 0 16 11.731V4.269a1 1 0 0 0-1.406-.913l-3.111 1.382A2 2 0 0 0 9.5 3H4.272l6.69 9.365zm-10.114-9A2.001 2.001 0 0 0 0 5v6a2 2 0 0 0 2 2h5.728L.847 3.366zm9.746 11.925l-10-14 .814-.58 10 14-.814.58z"
      />
    </Svg>
  );
};
