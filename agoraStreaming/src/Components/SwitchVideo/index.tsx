import React, {FC} from 'react';
import {Switch, Text, View} from 'react-native';

import {Colors} from '../../Colors/colors';
import {styles} from './styles';
import {SwitchVideoType} from './types';

export const SwitchVideo: FC<SwitchVideoType> = (props) => {
  const {isEnabled, setIsEnabled} = props;
  const {bittersweet, wildSand, jumbo, babyBlueEyes} = Colors;

  return (
    <View style={styles.wrapperView}>
      <Text>Video</Text>
      <Switch
        trackColor={{false: jumbo, true: babyBlueEyes}}
        thumbColor={isEnabled ? bittersweet : wildSand}
        onValueChange={setIsEnabled}
        value={isEnabled}
      />
    </View>
  );
};
