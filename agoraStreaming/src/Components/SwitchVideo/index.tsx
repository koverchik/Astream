import React, {FC} from 'react';
import {Switch, Text, View} from 'react-native';

import {styles} from './styles';
import {SwitchVideoType} from './types';

export const SwitchVideo: FC<SwitchVideoType> = (props) => {
  const {isEnabled, setIsEnabled} = props;

  return (
    <View style={styles.wrapperView}>
      <Text>Video</Text>
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#FF7070' : '#f4f3f4'}
        onValueChange={setIsEnabled}
        value={isEnabled}
      />
    </View>
  );
};
