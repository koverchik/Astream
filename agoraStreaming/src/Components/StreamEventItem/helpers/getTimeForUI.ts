import {addZeroForMinutes} from '../../../Screens/Calendar/helpers/addZero';

export const getTimeForUI = (date: Date) => {
  return `${date.getHours()}:${addZeroForMinutes(date.getMinutes())}`;
};
