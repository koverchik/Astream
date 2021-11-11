import React, {FC} from 'react';
import {View} from 'react-native';
import {IconUserName} from '../IconUserName';
import {RtcLocalView} from 'react-native-agora';
import {UserNameLabel} from '../UserNameLabel/UserNameLabel';
import {LocalUserPropsType} from './types';
import {styles} from './styles';

export const LocalUser: FC<LocalUserPropsType> = (props) => {
  const {
    myUserData,
    sizeUserPoint,
    wavesAroundUserPoint,
    countUsers,
    activeVoice,
    channelId,
  } = props;
  return (
    <View style={styles.camera}>
      {myUserData.camera ? (
        <View style={[styles.muteCamera, styles.camera]}>
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
