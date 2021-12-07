import {ChannelsListFromFirebase, ListChannelsType} from '../types';

export const addCallouts = (
  channelListFirebase: ChannelsListFromFirebase[],
  channelsList: ListChannelsType[],
) => {
  return channelListFirebase.map((channel) => {
    const selectChannel = channelsList.find((selectChannel) => {
      return selectChannel.name === channel.name;
    });

    if (selectChannel && selectChannel.calloutIsShow) {
      return {
        ...channel,
        calloutIsShow: true,
      };
    } else {
      return {
        ...channel,
        calloutIsShow: false,
      };
    }
  });
};
