import React, {FC, useState} from 'react';
import {View} from 'react-native';
import {Calendar} from 'react-native-calendars';

import {ModalCreatEvent} from '../../Components/ModalCreateEvent';

export const ScreenCalendar: FC = () => {
  const dataSystem = new Date();
  const [chosenDay, setChoseDay] = useState(
    `${dataSystem.getFullYear()}-${
      dataSystem.getMonth() + 1
    }-${dataSystem.getDate()}`,
  );
  return (
    <View>
      <Calendar
        onDayPress={(day) => {
          setChoseDay(day.dateString);
        }}
      />
      <ModalCreatEvent day={chosenDay} />
    </View>
  );
};
