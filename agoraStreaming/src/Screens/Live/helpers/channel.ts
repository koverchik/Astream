import RtcEngine, {ChannelProfile, ClientRole} from 'react-native-agora';
import {
  AudioVolumeCallback,
  UidWithMutedCallback,
  UserAccountCallback,
  UserInfoCallback,
  UserOfflineCallback,
} from 'react-native-agora/lib/typescript/src/common/RtcEvents';

const appID = 'fecf7537eab9494b9612e782053cc546';

export const initChannel = async (
  AgoraEngine: React.MutableRefObject<RtcEngine | undefined>,
  callbackUserJoined: () => void,
  userLeaveChannel: () => Promise<void>,
  callBackFunctionUserOffline: UserOfflineCallback,
  callbackFunctionUserInfoUpdated: UserInfoCallback,
  callBackFunctionUserMuteVideo: UidWithMutedCallback,
  callBackUserMuteAudio: UidWithMutedCallback,
  callbackFunctionLocalUserRegistered: UserAccountCallback,
  callbackFunctionAudioVolumeIndication: AudioVolumeCallback,
) => {
  AgoraEngine.current = await RtcEngine.create(appID);

  AgoraEngine.current?.enableVideo();

  AgoraEngine.current.enableAudioVolumeIndication(3000, 6, true);

  AgoraEngine.current?.setChannelProfile(ChannelProfile.LiveBroadcasting);

  AgoraEngine.current?.setClientRole(ClientRole.Broadcaster);

  AgoraEngine.current?.addListener('JoinChannelSuccess', callbackUserJoined);

  AgoraEngine.current?.addListener(
    'LocalUserRegistered',
    callbackFunctionLocalUserRegistered,
  );

  AgoraEngine.current?.addListener(
    'UserInfoUpdated',
    callbackFunctionUserInfoUpdated,
  );

  AgoraEngine.current.addListener(
    'AudioVolumeIndication',
    callbackFunctionAudioVolumeIndication,
  );

  AgoraEngine.current?.addListener('UserOffline', callBackFunctionUserOffline);

  AgoraEngine.current?.addListener('LeaveChannel', (StatsCallback) => {
    StatsCallback.userCount === 1 ? userLeaveChannel() : null;
    AgoraEngine.current?.destroy();
  });

  AgoraEngine.current?.addListener(
    'UserMuteVideo',
    callBackFunctionUserMuteVideo,
  );

  AgoraEngine.current?.addListener('UserMuteAudio', callBackUserMuteAudio);
};
