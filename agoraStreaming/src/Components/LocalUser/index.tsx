import React, {FC} from 'react';
import {View} from 'react-native';
import {RtcLocalView} from 'react-native-agora';

import {IconUserName} from '../IconUserName';
import {UserNameLabel} from '../UserNameLabel/UserNameLabel';
import {styles} from './styles';
import {LocalUserPropsType} from './types';

export const LocalUser: FC<LocalUserPropsType> = (props) => {
  const {
    myUserData,
    sizeUserPoint,
    wavesAroundUserPoint,
    countUsers,
    activeVoice,
    channelId,
    cameraSize,
  } = props;

  return (
    <View style={cameraSize}>
      {myUserData.camera ? (
        <View style={[styles.muteCamera, styles.rtcLocal]}>
          {activeVoice && (
            <IconUserName
              userName={myUserData.userAccount}
              countUser={countUsers}
              sizeUserPoint={sizeUserPoint}
              wavesAroundUserPoint={wavesAroundUserPoint}
            />
          )}
        </View>
      ) : (
        <RtcLocalView.SurfaceView
          style={styles.rtcLocal}
          channelId={channelId}
        />
      )}
      <View style={styles.userNameContainer}>
        <UserNameLabel userName={myUserData.userAccount} />
      </View>
    </View>
  );
};
