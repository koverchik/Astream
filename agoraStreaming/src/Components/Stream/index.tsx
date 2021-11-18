import React, {FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {CalendarSvg} from '../../Icons/CalendarSvg';
import {CameraSvg} from '../../Icons/CameraSvg';
import {ChatSvg} from '../../Icons/ChatSvg';
import {SoundSvg} from '../../Icons/SoundSvg';
import {CallTypes} from '../../Screens/Calendar/types';
import {styles} from './styles';
import {StreamPropsType} from './types';

export const Stream: FC<StreamPropsType> = (props) => {
  const {time, type, name} = props.stream;

  const getStreamTypeIcon = () => {
    switch (type) {
      case CallTypes.Audio: {
        return <SoundSvg color={'#0494f3'} size={16} />;
      }
      case CallTypes.Video: {
        return <CameraSvg color={'#0494f3'} size={13} />;
      }
      case CallTypes.Chat: {
        return <ChatSvg color={'#0494f3'} size={13} />;
      }
      default:
        return <SoundSvg color={'#2997dc'} size={16} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarBox}>
        <View style={styles.avatar} />
        <View style={styles.type}>{getStreamTypeIcon()}</View>
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
