import React, {FC, useEffect} from 'react';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import Animated, {
  interpolate,
  measure,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';

import {CalendarSvg} from '../../Icons/CalendarSvg';
import {DefaultAvatar} from '../../Icons/DefaultAvatar';
import {addZeroForMinutes} from '../../Screens/Calendar/helpers/addZero';
import {getStreamTypeIcon} from './helpers/getStreamTypeIcon';
import {styles} from './styles';
import {StreamPropsType} from './types';

const SIZE_ITEM = 95;

export const Stream: FC<StreamPropsType> = (props) => {
  const {time, type, name, id} = props.stream;
  const {translationY, index} = props;

  const inputRange = [
    (-index - 1) * SIZE_ITEM,
    index * SIZE_ITEM,
    (index + 1) * SIZE_ITEM,
  ];
  const aRef = useAnimatedRef();

  const reanimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(translationY.value, inputRange, [1, 1, 0.7]);
    const opacity = interpolate(translationY.value, inputRange, [1, 1, 0.5]);
    return {
      opacity: opacity,
      transform: [
        {
          scale,
        },
      ],
    };
  });

  const dataTime = new Date(time);
  return (
    <Animated.View style={[styles.container, reanimatedStyle]} key={id}>
      <View style={styles.avatarBox}>
        <View style={styles.avatar}>
          <DefaultAvatar size={'70%'} />
        </View>
        <View style={styles.type}>{getStreamTypeIcon(type)}</View>
      </View>
      <View style={styles.middleBox}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.time}>{`${dataTime.getHours()}:${addZeroForMinutes(
          dataTime.getMinutes(),
        )}`}</Text>
      </View>
      <TouchableOpacity activeOpacity={0.5}>
        <View style={styles.button}>
          <CalendarSvg color={'#2997dc'} size={11} />
          <Text style={styles.buttonText}>Add to Call</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};
