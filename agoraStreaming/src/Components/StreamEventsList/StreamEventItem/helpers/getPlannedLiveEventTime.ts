import {addZeroForMinutes} from '../../../../Screens/Calendar/helpers/addZero';

export const getPlannedLiveEventTime = (date: Date) => {
  return `${date.getHours()}:${addZeroForMinutes(date.getMinutes())}`;
};
