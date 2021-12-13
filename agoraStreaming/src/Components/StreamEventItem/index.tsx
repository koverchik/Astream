import React, {FC} from 'react';
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';

import {useNavigation} from '@react-navigation/native';

import {COLORS} from '../../Colors/colors';
import {CalendarSvg} from '../../Icons/CalendarSvg';
import {DefaultAvatar} from '../../Icons/DefaultAvatar';
import {LiveType, MainStackScreens} from '../../Navigation/Stack/types';
import {addZeroForMinutes} from '../../Screens/Calendar/helpers/addZero';
import {StackNavigationPropLive} from '../../Screens/Live/types';
import {getStreamTypeIcon} from './helpers/getStreamTypeIcon';
import {StreamItemStyles} from './styles';
import {StreamEventItemPropsType} from './types';

const START_ANIMATION = 95;

export const StreamEventItem: FC<StreamEventItemPropsType> = (props) => {
  const {time, type, name, channelId, isVideo} = props.stream;
  const {translationY, index} = props;

  const navigation = useNavigation<StackNavigationPropLive>();

  const {width} = useWindowDimensions();
  const styles = StreamItemStyles(width, channelId);

  const dataTime = new Date(time);
  const inputRange = [
    (-index - 1) * START_ANIMATION,
    index * START_ANIMATION,
    (index + 1) * START_ANIMATION,
  ];

  const onPressNotification = () => {
    if (channelId) {
      navigation.navigate(MainStackScreens.Live, {
        type: LiveType.JOIN,
        channelId,
        isVideo,
      });
    } else {
      Alert.alert('Stream is not started');
    }
  };

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
        <View style={styles.streamStatus}>
          <View style={styles.streamStatusCircle} />
          <Text>{channelId ? 'Online' : 'Offline'}</Text>
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.button}
        onPress={onPressNotification}>
        <CalendarSvg color={COLORS.AZURE_RADIANCE} size={11} />
        <Text style={styles.buttonText}>Add to Call</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};
