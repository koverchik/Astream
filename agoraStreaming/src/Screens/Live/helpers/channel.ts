import RtcEngine, {ChannelProfile, ClientRole} from 'react-native-agora';
import {UserType} from '../types';
import {InitChannelDataType} from './types';

const appID = 'fecf7537eab9494b9612e782053cc546';

export const initChannel = async (initData: InitChannelDataType) => {
  initData.AgoraEngine.current = await RtcEngine.create(appID);

  initData.AgoraEngine.current?.enableVideo();

  initData.AgoraEngine.current?.enableAudioVolumeIndication(3000, 6, true);

  initData.AgoraEngine.current?.setChannelProfile(
    ChannelProfile.LiveBroadcasting,
  );

  initData.AgoraEngine.current?.setClientRole(ClientRole.Broadcaster);

  initData.AgoraEngine.current?.addListener('JoinChannelSuccess', () => {
    initData.userJoined();
  });

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
      // if (initData.peerIds.length < 4) {
      //   initData.setPeerIds((prev) => [...prev, user]);
      // } else {
      //   initData.setStash((prev) => [...prev, user]);
      // }

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
        // if (initData.peerIds.length < 4) {
        //   initData.setPeerIds((prev) => [...prev, user]);
        // } else {
        //   initData.setStash((prev) => [...prev, user]);
        // }
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

  initData.AgoraEngine.current?.addListener(
    'AudioVolumeIndication',
    (speakers) => {
      for (let i = 0; i < speakers.length; i++) {
        const speaker = speakers[i];
        if (speaker.volume) {
          if (speaker.vad === 1 && speaker.uid === 0) {
            initData.activeVoiceSet(true);
          } else {
            initData.activeVoiceSet(false);
          }

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

  initData.AgoraEngine.current?.addListener('UserMuteVideo', (uid, muted) => {
    initData.setPeerIds((prevState) => {
      return initData.mute({uid, muted, device: 'camera'}, prevState);
    });
  });

  initData.AgoraEngine.current?.addListener('UserMuteAudio', (uid, muted) => {
    initData.setPeerIds((prevState) => {
      return initData.mute({uid, muted, device: 'voice'}, prevState);
    });
  });
};
