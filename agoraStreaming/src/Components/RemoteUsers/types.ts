export type RemoteUsersType = {
  uid: number;
  channelId: string;
  countUsers: () => number;
  userAccount: string;
  voice: boolean;
  camera: boolean;
  activeVoice: boolean;
};
