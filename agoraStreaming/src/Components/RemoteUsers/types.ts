export type RemoteUsersType = {
  uid: number;
  channelId: string;
  countUsers: () => number;
  userAccount: any;
};
