import React, {FC} from 'react';
import {Switch, Text, View} from 'react-native';

import {COLORS} from '../../Colors/colors';
import {styles} from './styles';
import {SwitchVideoType} from './types';

export const SwitchVideo: FC<SwitchVideoType> = (props) => {
  const {isEnabled, setIsEnabled} = props;
  const {BITTERSWEET, WILD_SAND, JUMBO, BABY_BLUE_EYES} = COLORS;

  return (
    <View style={styles.wrapperView}>
      <Text>Video</Text>
      <Switch
        trackColor={{false: JUMBO, true: BABY_BLUE_EYES}}
        thumbColor={isEnabled ? BITTERSWEET : WILD_SAND}
        onValueChange={setIsEnabled}
        value={isEnabled}
      />
    </View>
  );
};
