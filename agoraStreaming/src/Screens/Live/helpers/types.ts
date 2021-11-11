import {Dispatch, MutableRefObject, SetStateAction} from 'react';
import RtcEngine from 'react-native-agora';
import {MuteSettingsType, UserType} from '../types';
import {LocalUserType} from '../../../Components/RemoteUsers/types';

export type InitChannelDataType = {
  AgoraEngine: MutableRefObject<RtcEngine | undefined>;
  userJoined: () => void;
  setMyUserData: Dispatch<SetStateAction<LocalUserType>>;
  peerIds: UserType[];
  setPeerIds: Dispatch<SetStateAction<UserType[]>>;
  activeVoiceSet: Dispatch<SetStateAction<boolean>>;
  mute: (settings: MuteSettingsType, data: UserType[]) => UserType[];
  userLeaveChannel: () => Promise<void>;
  setStash: Dispatch<SetStateAction<UserType[]>>;
};
