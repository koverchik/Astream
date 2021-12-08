import React, {FC} from 'react';
import {View} from 'react-native';

import {Colors} from '../../Colors/colors';
import {CameraMutedSvg} from '../../Icons/CameraMutedSvg';
import {CameraSvg} from '../../Icons/CameraSvg';
import {ExitSvg} from '../../Icons/ExitSvg';
import {MicroMutedSvg} from '../../Icons/MicroMutedSvg';
import {MicroSvg} from '../../Icons/MicroSvg';
import {SwitchCameraSvg} from '../../Icons/SwitchCameraSvg';
import {RoundButton} from './RoundButton';
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
    isVideo,
  } = props;

  return (
    <View style={styles.buttonBar}>
      <RoundButton
        handler={microphoneHandler}
        icon={muteVoice ? <MicroMutedSvg /> : <MicroSvg />}
      />
      {isVideo && (
        <RoundButton
          handler={cameraHandler}
          icon={
            muteCamera ? (
              <CameraMutedSvg />
            ) : (
              <CameraSvg color={Colors.black} size={'60%'} />
            )
          }
        />
      )}
      <RoundButton handler={switchCamera} icon={<SwitchCameraSvg />} />
      <RoundButton
        handler={exitHandler}
        icon={<ExitSvg />}
        color={Colors.ceriseRed}
      />
    </View>
  );
};
