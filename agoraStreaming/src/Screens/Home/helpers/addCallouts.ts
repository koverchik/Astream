import {ChannelFromFirebaseType, ListChannelsType} from '../types';

export const addCallouts = (
  channelListFirebase: ChannelFromFirebaseType[],
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
