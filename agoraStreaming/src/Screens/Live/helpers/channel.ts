import {MutableRefObject} from 'react';
import RtcEngine, {ChannelProfile, ClientRole} from 'react-native-agora';
import {
  AudioVolumeCallback,
  UidWithMutedCallback,
  UserAccountCallback,
  UserInfoCallback,
  UserOfflineCallback,
} from 'react-native-agora/lib/typescript/src/common/RtcEvents';

import {RootStackParamList} from '../../../Navigation/Stack/types';

const appID = 'fecf7537eab9494b9612e782053cc546';

export const initChannel = async (
  AgoraEngine: MutableRefObject<RtcEngine | undefined>,
  userJoinedHandler: () => void,
  userLeaveChannel: () => Promise<void>,
  userOfflineHandler: UserOfflineCallback,
  userInfoUpdatedHandler: UserInfoCallback,
  userMuteVideoHandler: UidWithMutedCallback,
  userMuteAudioHandler: UidWithMutedCallback,
  localUserRegisteredHandler: UserAccountCallback,
  audioVolumeIndicationHandler: AudioVolumeCallback,
  isVideo: RootStackParamList['Live']['isVideo'],
): Promise<void> => {
  AgoraEngine.current = await RtcEngine.create(appID);

  isVideo
    ? AgoraEngine.current?.enableVideo()
    : AgoraEngine.current?.disableVideo();

  AgoraEngine.current?.enableAudioVolumeIndication(3000, 6, true);

  AgoraEngine.current?.setChannelProfile(ChannelProfile.LiveBroadcasting);

  AgoraEngine.current?.setClientRole(ClientRole.Broadcaster);

  AgoraEngine.current?.addListener('JoinChannelSuccess', userJoinedHandler);

  AgoraEngine.current?.addListener(
    'LocalUserRegistered',
    localUserRegisteredHandler,
  );

  AgoraEngine.current?.addListener('UserInfoUpdated', userInfoUpdatedHandler);

  AgoraEngine.current?.addListener('UserOffline', userOfflineHandler);

  AgoraEngine.current?.addListener('LeaveChannel', (StatsCallback) => {
    StatsCallback.userCount === 1 ? userLeaveChannel() : null;
    AgoraEngine.current?.destroy();
  });

  AgoraEngine.current?.addListener('UserMuteVideo', userMuteVideoHandler);

  AgoraEngine.current?.addListener('UserMuteAudio', userMuteAudioHandler);
};
