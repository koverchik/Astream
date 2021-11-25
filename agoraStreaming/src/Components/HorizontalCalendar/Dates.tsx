import {Moment} from 'moment';
import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';

import {Day} from './Day';

type DatesType = {
  currentDateIndex: number | null;
  dates: Moment[];
  onSelectDay: (index: number, date: Moment) => void;
};

export const Dates: FC<DatesType> = (props) => {
  const {currentDateIndex, dates, onSelectDay} = props;

  return (
    <View style={styles.container}>
      {dates.map((date, index) => (
        <View key={index}>
          <Day
            date={date}
            index={index}
            isActive={index === currentDateIndex}
            onPress={onSelectDay}
            key={index}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
