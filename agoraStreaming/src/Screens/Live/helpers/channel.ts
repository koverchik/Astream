import RtcEngine, {ChannelProfile, ClientRole} from 'react-native-agora';
import {MuteSettingsType, UserType} from '../types';

const appID = 'fecf7537eab9494b9612e782053cc546';

export const initChannel = async (
  AgoraEngine: React.MutableRefObject<RtcEngine | undefined>,
  userJoined: () => void,
  setUserName: React.Dispatch<React.SetStateAction<string>>,
  peerIds: UserType[],
  setPeerIds: React.Dispatch<React.SetStateAction<UserType[]>>,
  activeVoiceSet: React.Dispatch<React.SetStateAction<boolean>>,
  mute: (settings: MuteSettingsType, data: UserType[]) => UserType[],
  userLeaveChannel: () => Promise<void>,
) => {
  AgoraEngine.current = await RtcEngine.create(appID);

  AgoraEngine.current?.enableVideo();

  AgoraEngine.current.enableAudioVolumeIndication(3000, 6, true);

  AgoraEngine.current?.setChannelProfile(ChannelProfile.LiveBroadcasting);

  AgoraEngine.current?.setClientRole(ClientRole.Broadcaster);

  AgoraEngine.current?.addListener('JoinChannelSuccess', () => {
    userJoined();
  });

  AgoraEngine.current?.addListener('LocalUserRegistered', (uid, userInfo) => {
    setUserName(userInfo);
  });

  AgoraEngine.current?.addListener('UserInfoUpdated', (uid, userInfo) => {
    if (!peerIds.find((userData) => userData.uid === uid)) {
      const user: UserType = {
        ...userInfo,
        camera: false,
        voice: false,
        activeVoice: false,
      };
      setPeerIds((prev) => [...prev, user]);
    }
  });
  AgoraEngine.current.addListener('AudioVolumeIndication', (speakers) => {
    for (let i = 0; i < speakers.length; i++) {
      const speaker = speakers[i];
      if (speaker['volume']) {
        if (speaker['vad'] === 1 && speaker['uid'] === 0) {
          activeVoiceSet(true);
        } else {
          activeVoiceSet(false);
        }

        setPeerIds((prev) => {
          return prev.map((user) => {
            if (user.uid === speaker.uid) {
              return {
                ...user,
                activeVoice: true,
              };
            } else {
              return {
                ...user,
                activeVoice: false,
              };
            }
          });
        });
      }
    }
  });

  AgoraEngine.current?.addListener('UserOffline', (uid) => {
    setPeerIds((prev) => prev.filter((userData) => userData.uid !== uid));
  });

  AgoraEngine.current?.addListener('LeaveChannel', (StatsCallback) => {
    StatsCallback.userCount === 1 ? userLeaveChannel() : null;
    AgoraEngine.current?.destroy();
  });

  AgoraEngine.current?.addListener('UserMuteVideo', (uid, muted) => {
    setPeerIds((prevState) => {
      return mute({uid, muted, device: 'camera'}, prevState);
    });
  });

  AgoraEngine.current?.addListener('UserMuteAudio', (uid, muted) => {
    setPeerIds((prevState) => {
      return mute({uid, muted, device: 'voice'}, prevState);
    });
  });
};
