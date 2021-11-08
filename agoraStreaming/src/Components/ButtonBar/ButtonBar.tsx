import React, {FC} from 'react';
import {View} from 'react-native';
import {RoundButton} from './RoundButton/RoundButton';
import {ButtonBarPropsType} from './types';
import {ExitSvg} from '../../Icons/ExitSvg';
import {styles} from './styles';
import {CameraSvg} from '../../Icons/CameraSvg';
import {MicroSvg} from '../../Icons/MicroSvg';
import {SwitchCameraSvg} from '../../Icons/SwitchCameraSvg';

export const ButtonBar: FC<ButtonBarPropsType> = (props) => {
  const {exitHandler, cameraHandler} = props;
  return (
    <View style={styles.buttonBar}>
      <RoundButton handler={exitHandler} icon={MicroSvg} />
      <RoundButton handler={cameraHandler} icon={CameraSvg} />
      <RoundButton handler={exitHandler} icon={SwitchCameraSvg} />
      <RoundButton handler={exitHandler} icon={ExitSvg} color={'#dc5878'} />
    </View>
  );
};
