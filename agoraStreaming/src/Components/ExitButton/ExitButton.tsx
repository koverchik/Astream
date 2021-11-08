import React, {FC} from 'react';
import {Pressable} from 'react-native';
import {ExitSvg} from '../../Icons/Exit/ExitSvg';
import {styles} from './ExitButton.styles';

export const ExitButton: FC<any> = props => {
  return (
    <Pressable style={styles.wrapper}>
      <ExitSvg />
    </Pressable>
  );
};
