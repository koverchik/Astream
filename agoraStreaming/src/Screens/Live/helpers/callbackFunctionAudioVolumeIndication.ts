import {Dispatch, SetStateAction} from 'react';
import {AudioVolumeCallback} from 'react-native-agora/lib/typescript/src/common/RtcEvents';
import {UserType} from '../types';

export const callbackFunctionAudioVolumeIndication =
  (
    activeVoiceSet: Dispatch<SetStateAction<boolean>>,
    setPeerIds: Dispatch<SetStateAction<UserType[]>>,
  ): AudioVolumeCallback =>
  (speakers) => {
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
  };
