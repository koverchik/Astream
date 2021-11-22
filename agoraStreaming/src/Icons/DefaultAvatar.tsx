import React, {FC} from 'react';
import {SvgUri} from 'react-native-svg';

import {AvatarPropsType} from './types';

export const DefaultAvatar: FC<AvatarPropsType> = (props) => {
  const {size} = props;

  return (
    <SvgUri
      width={size}
      height={size}
      uri="https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/debian.svg"
    />
  );
};
