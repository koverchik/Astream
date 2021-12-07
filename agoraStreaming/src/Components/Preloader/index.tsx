import React, {FC} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';

import {styles} from './styles';
import {PreloaderPropsType} from './types';

export const Preloader: FC<PreloaderPropsType> = (props) => {
  const {text} = props;

  return (
    <View style={styles.container}>
      <ActivityIndicator size={60} color="#222" />
      <Text style={styles.loadingText}>{text}</Text>
    </View>
  );
};
