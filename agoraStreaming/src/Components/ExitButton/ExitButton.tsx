import React, {FC} from 'react';
import {Pressable} from 'react-native';
import {ExitSvg} from '../../Icons/Exit/ExitSvg';
import {styles} from './styles';
import {ExitButtonPropsType} from './types';

export const ExitButton: FC<ExitButtonPropsType> = (props) => {
  const {exitHandler} = props;
  return (
    <Pressable style={styles.wrapper} onPress={exitHandler}>
      <ExitSvg />
    </Pressable>
  );
};
