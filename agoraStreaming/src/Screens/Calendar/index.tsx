import React, {FC} from 'react';
import {Text, View} from 'react-native';

export const Calendar: FC = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: '#000'}}>Calendar Screen</Text>
    </View>
  );
};
