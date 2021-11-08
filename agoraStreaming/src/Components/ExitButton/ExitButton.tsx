import React, {FC} from 'react';
import {Pressable} from 'react-native';
import {ExitSvg} from '../../Icons/Exit/ExitSvg';
import {styles} from './ExitButton.styles';
import {ExitButtonPropsType} from './types';

export const ExitButton: FC<ExitButtonPropsType> = ({exitHandler}) => {
  return (
    <Pressable style={styles.wrapper} onPress={exitHandler}>
      <ExitSvg />
    </Pressable>
  );
};
