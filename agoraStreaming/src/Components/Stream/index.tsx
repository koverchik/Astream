import React, {FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {CalendarSvg} from '../../Icons/CalendarSvg';
import {getStreamTypeIcon} from './helpers/getStreamTypeIcon';
import {styles} from './styles';
import {StreamPropsType} from './types';

export const Stream: FC<StreamPropsType> = (props) => {
  const {time, type, name} = props.stream;

  return (
    <View style={styles.container}>
      <View style={styles.avatarBox}>
        <View style={styles.avatar} />
        <View style={styles.type}>{getStreamTypeIcon(type)}</View>
      </View>
      <View style={styles.middleBox}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
      <TouchableOpacity activeOpacity={0.5}>
        <View style={styles.button}>
          <CalendarSvg color={'#2997dc'} size={11} />
          <Text style={styles.buttonText}>Add to Call</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
