import React, {FC} from 'react';
import {Pressable, Text, View} from 'react-native';

import {CalendarSvg} from '../../Icons/CalendarSvg';
import {styles} from './styles';
import {StreamPropsType} from './types';

export const Stream: FC<StreamPropsType> = (props) => {
  const {time, type, name} = props.stream;

  return (
    <View style={styles.container}>
      <View style={styles.avatarBox}>
        <View style={styles.avatar} />
        <View style={styles.type}>
          <Text>{type.slice(0, 1)}</Text>
        </View>
      </View>
      <View style={styles.middleBox}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
      <Pressable style={styles.button}>
        <CalendarSvg color={'#2997dc'} size={11} />
        <Text style={styles.buttonText}>Add to Call</Text>
      </Pressable>
    </View>
  );
};
