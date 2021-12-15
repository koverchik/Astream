import React, {FC, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View, useWindowDimensions} from 'react-native';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';

import {useNavigation} from '@react-navigation/native';

import {COLORS} from '../../../Colors/colors';
import {CalendarSvg} from '../../../Icons/CalendarSvg';
import {DefaultAvatar} from '../../../Icons/DefaultAvatar';
import {StackNavigationPropLive} from '../../../Screens/Live/types';
import {eventButtonHandler} from './helpers/eventButtonHandler';
import {getEventButtonTitle} from './helpers/getEventButtonTitle';
import {getPlannedLiveEventTime} from './helpers/getPlannedLiveEventTime';
import {getStreamTypeIcon} from './helpers/getStreamTypeIcon';
import {StreamItemStyles} from './styles';
import {StreamEventItemPropsType, StreamStatus} from './types';

const START_ANIMATION = 95;

export const StreamEventItem: FC<StreamEventItemPropsType> = (props) => {
  const {translationY, index, stream, geolocation} = props;
  const {time, type, name, channelId, eventIsOver} = stream;

  const [currentTime, setCurrentTime] = useState<number>(Date.now());
  const navigation = useNavigation<StackNavigationPropLive>();

  useEffect(() => {
    const timeoutId = setInterval(() => {
      setCurrentTime(Date.now());
    }, 30000);

    return () => {
      clearInterval(timeoutId);
    };
  }, []);

  const itsNotTimeYet = currentTime < time;
  const disabledEventButton = itsNotTimeYet || eventIsOver;

  const {AZURE_RADIANCE, PORCELAIN} = COLORS;
  const {width} = useWindowDimensions();
  const styles = StreamItemStyles(width, channelId, disabledEventButton);

  const calendarSvgColor = disabledEventButton ? PORCELAIN : AZURE_RADIANCE;
  const streamTypeIcon = getStreamTypeIcon(type);
  const buttonTitle = getEventButtonTitle(
    channelId,
    eventIsOver,
    itsNotTimeYet,
  );
  const streamIndicatorTitle = channelId
    ? StreamStatus.ONLINE
    : StreamStatus.OFFLINE;

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

  const onPressEventButton = async () => {
    await eventButtonHandler(stream, geolocation, navigation);
  };

  return (
    <Animated.View style={[styles.container, reanimatedStyle]}>
      <View style={styles.avatarBox}>
        <View style={styles.avatar}>
          <DefaultAvatar size={'70%'} />
        </View>
        <View style={styles.type}>{streamTypeIcon}</View>
      </View>
      <View style={styles.middleBox}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.time}>
          {getPlannedLiveEventTime(new Date(time))}
        </Text>
        <View style={styles.streamStatus}>
          <View style={styles.streamStatusIndicator} />
          <Text>{streamIndicatorTitle}</Text>
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.button}
        disabled={disabledEventButton}
        onPress={onPressEventButton}>
        <CalendarSvg color={calendarSvgColor} size={11} />
        <Text style={styles.buttonText}>{buttonTitle}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};
