import React, {FC} from 'react';
import {Text, View} from 'react-native';

import {StreamEventItem} from './StreamEventItem';
import {styles} from './styles';
import {StreamEventListPropsType} from './types';

export const StreamEventsList: FC<StreamEventListPropsType> = (props) => {
  const {streams, dataForStreamEventList, geolocation, translationY} = props;
  const streamsArrayIsNotEmpty = streams.length;

  const streamEventItems = dataForStreamEventList?.map((item, index) => {
    return (
      <StreamEventItem
        stream={item}
        key={item.time + index}
        translationY={translationY}
        index={index}
        geolocation={geolocation}
      />
    );
  });

  return streamsArrayIsNotEmpty ? (
    <>{streamEventItems}</>
  ) : (
    <View style={styles.titleForEmptyListContainer}>
      <Text>No scheduled streams</Text>
    </View>
  );
};
