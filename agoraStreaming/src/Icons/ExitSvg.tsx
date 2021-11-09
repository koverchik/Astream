import React, {FC} from 'react';
import Svg, {G, Path} from 'react-native-svg';

export const ExitSvg: FC = () => {
  return (
    <Svg width="60%" height="60%" viewBox="0 0 520 510" fill="#000">
      <G>
        <Path
          d="M416.667,333.333v-66.666H250V200h166.667v-66.667l100,100L416.667,333.333z M383.333,300v133.333H216.667v100l-200-100V0
    h366.667v166.667H350V33.333H83.333L216.667,100v300H350V300H383.333z"
        />
      </G>
    </Svg>
  );
};
