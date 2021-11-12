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

  AgoraEngine.current?.enableAudioVolumeIndication(3000, 6, true);

  AgoraEngine.current?.setChannelProfile(
    ChannelProfile.LiveBroadcasting,
  );

  AgoraEngine.current?.setClientRole(ClientRole.Broadcaster);

  AgoraEngine.current?.addListener('JoinChannelSuccess', callbackUserJoined);

  AgoraEngine.current?.addListener(
    'LocalUserRegistered',
    callbackFunctionLocalUserRegistered,
  );
  initData.AgoraEngine.current?.addListener(
    'LocalUserRegistered',
    (uid, userInfo) => {
      initData.setMyUserData((prev) => ({
        ...prev,
        uid: uid,
        userAccount: userInfo,
      }));
      const user: UserType = {
        uid: uid,
        userAccount: userInfo,
        camera: false,
        voice: false,
        activeVoice: false,
      };
      initData.setPeerIds((prev) => {
        if (prev.length < 4) {
          return [...prev, user];
        } else {
          initData.setStash((prevStash) => [...prevStash, user]);
          return prev;
        }
      });
    },
  );

  AgoraEngine.current?.addListener(
    'UserInfoUpdated',
    callbackFunctionUserInfoUpdated,
  );
  initData.AgoraEngine.current?.addListener(
    'UserInfoUpdated',
    (uid, userInfo) => {
      if (!initData.peerIds.find((userData) => userData.uid === uid)) {
        const user: UserType = {
          ...userInfo,
          camera: false,
          voice: false,
          activeVoice: false,
        };
        initData.setPeerIds((prev) => {
          if (prev.length < 4) {
            return [...prev, user];
          } else {
            initData.setStash((prevStash) => [...prevStash, user]);
            return prev;
          }
        });
      }
    },
  );

  AgoraEngine.current?.addListener(
    'AudioVolumeIndication',
    (speakers) => {
      for (let i = 0; i < speakers.length; i++) {
        const speaker = speakers[i];
        if (speaker.volume) {
          if (speaker.vad === 1 && speaker.uid === 0) {
            initData.setMyUserData((prev) => ({...prev, activeVoice: true}));
          } else {
            initData.setMyUserData((prev) => ({...prev, activeVoice: false}));
          }

  AgoraEngine.current.addListener(
    'AudioVolumeIndication',
    callbackFunctionAudioVolumeIndication,
  );
          initData.setPeerIds((prev) => {
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
    },
  );

  AgoraEngine.current?.addListener('UserOffline', callBackFunctionUserOffline);
  initData.AgoraEngine.current?.addListener('UserOffline', (uid) => {
    initData.setPeerIds((prev) =>
      prev.filter((userData) => userData.uid !== uid),
    );
    initData.setStash((prev) =>
      prev.filter((userData) => userData.uid !== uid),
    );
  });

  initData.AgoraEngine.current?.addListener('LeaveChannel', (StatsCallback) => {
    StatsCallback.userCount === 1 ? initData.userLeaveChannel() : null;
    initData.AgoraEngine.current?.destroy();
  });

  AgoraEngine.current?.addListener(
    'UserMuteVideo',
    callBackFunctionUserMuteVideo,
  );
  initData.AgoraEngine.current?.addListener('UserMuteVideo', (uid, muted) => {
    initData.setPeerIds((prevState) => {
      return initData.mute({uid, muted, device: 'camera'}, prevState);
    });
  });

  AgoraEngine.current?.addListener('UserMuteAudio', callBackUserMuteAudio);
  initData.AgoraEngine.current?.addListener('UserMuteAudio', (uid, muted) => {
    initData.setPeerIds((prevState) => {
      return initData.mute({uid, muted, device: 'voice'}, prevState);
    });
  });
};
