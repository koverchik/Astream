import {
  ArrayListDataType,
  CallTypes,
  FunctionSortByTimeType,
  StreamType,
} from '../types';

const sortByTime: FunctionSortByTimeType = (arr) => {
  return arr.sort((a: StreamType, b: StreamType) => (a.time > b.time ? 1 : -1));
};

export const arrayListData: ArrayListDataType = (data, chosenDay) => {
  const dataForList: StreamType[] = [];

  for (const key in data) {
    const {video, name, dateTime, channelId, eventIsOver} = data[key];
    const time = Date.parse(dateTime);

    dataForList.push({
      time,
      name,
      chosenDay,
      eventIsOver,
      channelId: channelId ?? null,
      type: video ? CallTypes.Video : CallTypes.Audio,
      isVideo: video,
      eventId: key,
    });
  }
  sortByTime(dataForList);

  return dataForList;
};
