import React, {FC} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';

import {Colors} from '../../Colors/colors';
import {styles} from './styles';
import {PreloaderPropsType} from './types';

export const Preloader: FC<PreloaderPropsType> = (props) => {
  const {text} = props;

  return (
    <View style={styles.container}>
      <ActivityIndicator size={60} color={Colors.mineShaft} />
      <Text style={styles.loadingText}>{text}</Text>
    </View>
  );
};
