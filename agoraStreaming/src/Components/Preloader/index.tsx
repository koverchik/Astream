import React, {FC} from 'react';
import {ActivityIndicator, Modal, Text, View} from 'react-native';

import {COLORS} from '../../Colors/colors';
import {styles} from './styles';
import {PreloaderPropsType} from './types';

export const Preloader: FC<PreloaderPropsType> = (props) => {
  const {text} = props;

  return (
    <Modal>
      <View style={styles.container}>
        <ActivityIndicator size={60} color={COLORS.MINE_SHAFT} />
        <Text style={styles.loadingText}>{text}</Text>
      </View>
    </Modal>
  );
};
