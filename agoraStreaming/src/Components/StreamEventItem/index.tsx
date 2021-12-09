import React, {FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';

import {Colors} from '../../Colors/colors';
import {CalendarSvg} from '../../Icons/CalendarSvg';
import {DefaultAvatar} from '../../Icons/DefaultAvatar';
import {addZeroForMinutes} from '../../Screens/Calendar/helpers/addZero';
import {getStreamTypeIcon} from './helpers/getStreamTypeIcon';
import {styles} from './styles';
import {StreamEventItemPropsType} from './types';

const START_ANIMATION = 95;

export const StreamEventItem: FC<StreamEventItemPropsType> = (props) => {
  const {time, type, name} = props.stream;
  const {translationY, index} = props;

  const dataTime = new Date(time);
  const inputRange = [
    (-index - 1) * START_ANIMATION,
    index * START_ANIMATION,
    (index + 1) * START_ANIMATION,
  ];

  const reanimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(translationY.value, inputRange, [1, 1, 0.7]);
    const opacity = interpolate(translationY.value, inputRange, [1, 1, 0.5]);
    return {
      opacity,
      transform: [
        {
          scale,
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.container, reanimatedStyle]}>
      <View style={styles.avatarBox}>
        <View style={styles.avatar}>
          <DefaultAvatar size={'70%'} />
        </View>
        <View style={styles.type}>{getStreamTypeIcon(type)}</View>
      </View>
      <View style={styles.middleBox}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.time}>
          {`${dataTime.getHours()}:${addZeroForMinutes(dataTime.getMinutes())}`}
        </Text>
      </View>
      <TouchableOpacity activeOpacity={0.5} style={styles.button}>
        <CalendarSvg color={Colors.azureRadiance} size={11} />
        <Text style={styles.buttonText}>Add to Call</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};
