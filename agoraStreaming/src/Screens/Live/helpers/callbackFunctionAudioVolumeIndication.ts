import {Dispatch, SetStateAction} from 'react';
import {AudioVolumeCallback} from 'react-native-agora/lib/typescript/src/common/RtcEvents';
import {UserType} from '../types';
import {LocalUserType} from '../../../Components/RemoteUsers/types';

export const callbackFunctionAudioVolumeIndication =
  (
    setMyUserData: Dispatch<SetStateAction<LocalUserType>>,
    setPeerIds: Dispatch<SetStateAction<UserType[]>>,
  ): AudioVolumeCallback =>
  (speakers) => {
    for (let i = 0; i < speakers.length; i++) {
      const speaker = speakers[i];
      if (speaker.volume) {
        if (speaker.vad === 1 && speaker.uid === 0) {
          setMyUserData((prev) => ({...prev, activeVoice: true}));
        } else {
          setMyUserData((prev) => ({...prev, activeVoice: false}));
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
  };
