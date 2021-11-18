import React, {FC} from 'react';
import {View} from 'react-native';
import {Calendar} from 'react-native-calendars';

import {ModalCreatEvent} from '../../Components/ModalCreateEvent';

export const ScreenCalendar: FC = () => {
  return (
    <View>
      <Calendar />
      <ModalCreatEvent />
    </View>
  );
};
