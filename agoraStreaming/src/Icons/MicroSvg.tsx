import React, {FC} from 'react';
import Svg, {G, Path} from 'react-native-svg';

export const MicroSvg: FC = () => {
  return (
    <Svg width="60%" height="60%" viewBox="0 0 792 792" fill="#000">
      <G>
        <G id="_x31__33_">
          <G>
            <Path
              d="M396,594c95.684,0,173.25-77.566,173.25-173.25v-247.5C569.25,77.566,491.684,0,396,0S222.75,77.566,222.75,173.25v247.5
    C222.75,516.434,300.316,594,396,594z M668.25,470.25h-49.5C596.228,569.423,501.979,643.5,396,643.5
    s-200.228-74.077-222.75-173.25h-49.5c21.854,118.775,125.309,210.622,247.5,221.637V742.5H346.5
    c-13.662,0-24.75,11.088-24.75,24.75S332.838,792,346.5,792h99c13.662,0,24.75-11.088,24.75-24.75s-11.088-24.75-24.75-24.75
    h-24.75v-50.613C542.94,680.872,646.396,589.025,668.25,470.25z"
            />
          </G>
        </G>
      </G>
    </Svg>
  );
};