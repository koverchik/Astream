export type ListChannelsType = {
  data: ItemChannelType[];
  choseChannelAndJoinLive: (id: string) => void;
};
export type ItemChannelType = {
  name: string;
};
