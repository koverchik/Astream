import React, {FC} from 'react';
import {View} from 'react-native';

import {DayItem} from '../DayItem';
import {styles} from './styles';
import {DatesType} from './types';

export const Dates: FC<DatesType> = (props) => {
  const {currentDateIndex, dates, onSelectDay, activeDayColor, textDayColor} =
    props;

  return (
    <View style={styles.container}>
      {dates.map((date, index) => (
        <View key={date.format('DD MMMM YYYY')}>
          <DayItem
            date={date}
            index={index}
            isActive={index === currentDateIndex}
            onPress={onSelectDay}
            key={index}
            activeDayColor={activeDayColor}
            textDayColor={textDayColor}
          />
        </View>
      ))}
    </View>
  );
};
