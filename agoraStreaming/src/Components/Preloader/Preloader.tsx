import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';

import {styles} from './styles';

export const Preloader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={60} color="#222" />
      <Text style={styles.loadingText}>Joining Stream, Please Wait</Text>
    </View>
  );
};
