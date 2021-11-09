import React, {FC} from 'react';
import {View} from 'react-native';
import {RoundButton} from './RoundButton/RoundButton';
import {ButtonBarPropsType} from './types';
import {ExitSvg} from '../../Icons/ExitSvg';
import {styles} from './styles';
import {CameraSvg} from '../../Icons/CameraSvg';
import {MicroSvg} from '../../Icons/MicroSvg';
import {SwitchCameraSvg} from '../../Icons/SwitchCameraSvg';
import {CameraMutedSvg} from '../../Icons/CameraMutedSvg';
import {MicroMutedSvg} from '../../Icons/MicroMutedSvg';

export const ButtonBar: FC<ButtonBarPropsType> = (props) => {
  const {
    exitHandler,
    cameraHandler,
    microphoneHandler,
    switchCamera,
    muteCamera,
    muteVoice,
  } = props;
  return (
    <View style={styles.buttonBar}>
      <RoundButton
        handler={microphoneHandler}
        icon={muteVoice ? MicroMutedSvg : MicroSvg}
      />
      <RoundButton
        handler={cameraHandler}
        icon={muteCamera ? CameraMutedSvg : CameraSvg}
      />
      <RoundButton handler={switchCamera} icon={SwitchCameraSvg} />
      <RoundButton handler={exitHandler} icon={ExitSvg} color={'#da2b55'} />
    </View>
  );
};
