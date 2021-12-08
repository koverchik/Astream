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
  userJoinedCallback: () => void,
  userLeaveChannel: () => Promise<void>,
  userOfflineCallback: UserOfflineCallback,
  userInfoUpdatedCallback: UserInfoCallback,
  userMuteVideoCallback: UidWithMutedCallback,
  userMuteAudioCallback: UidWithMutedCallback,
  localUserRegisteredCallback: UserAccountCallback,
  audioVolumeIndicationCallback: AudioVolumeCallback,
  isVideo: RootStackParamList['Live']['isVideo'],
): Promise<void> => {
  AgoraEngine.current = await RtcEngine.create(appID);

  isVideo
    ? AgoraEngine.current?.enableVideo()
    : AgoraEngine.current?.disableVideo();

  AgoraEngine.current?.enableAudioVolumeIndication(3000, 10, true);

  AgoraEngine.current?.setChannelProfile(ChannelProfile.LiveBroadcasting);

  AgoraEngine.current?.setClientRole(ClientRole.Broadcaster);

  AgoraEngine.current?.addListener('JoinChannelSuccess', userJoinedCallback);

  AgoraEngine.current?.addListener(
    'LocalUserRegistered',
    localUserRegisteredCallback,
  );

  AgoraEngine.current?.addListener('UserInfoUpdated', userInfoUpdatedCallback);

  AgoraEngine.current?.addListener('UserOffline', userOfflineCallback);

  AgoraEngine.current?.addListener('LeaveChannel', (StatsCallback) => {
    StatsCallback.userCount === 1 ? userLeaveChannel() : null;
    AgoraEngine.current?.destroy();
  });

  AgoraEngine.current?.addListener('UserMuteVideo', userMuteVideoCallback);

  AgoraEngine.current.addListener(
    'AudioVolumeIndication',
    audioVolumeIndicationCallback,
  );
  AgoraEngine.current?.addListener('UserMuteAudio', userMuteAudioCallback);
};
