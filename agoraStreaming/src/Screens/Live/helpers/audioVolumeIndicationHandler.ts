import {AudioVolumeCallback} from 'react-native-agora/lib/typescript/src/common/RtcEvents';

import {LocalUserType} from '../../../Components/RemoteUsers/types';
import {SetStateType} from '../../../Types/universalTypes';
import {UserType} from '../types';

export const audioVolumeIndicationHandler =
  (
    setMyUserData: SetStateType<LocalUserType>,
    setPeerIds: SetStateType<UserType[]>,
  ): AudioVolumeCallback =>
  (speakers) => {
    for (let i = 0; i < speakers.length; i++) {
      const speaker = speakers[i];
      if (speaker.volume) {
        if ((speaker.vad === 1 || speaker.volume > 1) && speaker.uid === 0) {
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
