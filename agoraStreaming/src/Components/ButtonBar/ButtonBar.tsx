import React, {FC} from 'react';
import {View} from 'react-native';

import {CameraMutedSvg} from '../../Icons/CameraMutedSvg';
import {CameraSvg} from '../../Icons/CameraSvg';
import {ExitSvg} from '../../Icons/ExitSvg';
import {MicroMutedSvg} from '../../Icons/MicroMutedSvg';
import {MicroSvg} from '../../Icons/MicroSvg';
import {SwitchCameraSvg} from '../../Icons/SwitchCameraSvg';
import {RoundButton} from './RoundButton/RoundButton';
import {styles} from './styles';
import {ButtonBarPropsType} from './types';

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
