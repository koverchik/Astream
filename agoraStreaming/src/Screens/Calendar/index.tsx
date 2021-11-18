import React, {FC, useState} from 'react';
import {FlatList, Text, View} from 'react-native';

import {Stream} from '../../Components/Stream';
import {styles} from './styles';
import {StreamType} from './types';

export const Calendar: FC = () => {
  const [streams, setStreams] = useState<StreamType[]>([
    // TODO: Fake data for stream item
    // {id: 322, time: '10:00 PM', type: 'Audio', name: 'Lol'},
    // {id: 228, time: '11:00 AM', type: 'Video', name: 'Kek'},
    // {id: 1239, time: '09:00 PM', type: 'Chat', name: 'Cheburek'},
    // {id: 456, time: '10:00 PM', type: 'Video', name: 'Chik'},
    // {id: 741, time: '05:00 AM', type: 'Video', name: 'Chik'},
    // {id: 258, time: '10:00 AM', type: 'Video', name: 'Chik'},
    // {id: 2342456, time: '10:00 PM', type: 'Video', name: 'Chik'},
    // {id: 354741, time: '05:00 AM', type: 'Video', name: 'Chik'},
    // {id: 23458, time: '10:00 AM', type: 'Video', name: 'Chik'},
    // {id: 453456, time: '10:00 PM', type: 'Video', name: 'Chik'},
    // {id: 73441, time: '05:00 AM', type: 'Video', name: 'Chik'},
    // {id: 243558, time: '10:00 AM', type: 'Video', name: 'Chik'},
    // {id: 434556, time: '10:00 PM', type: 'Video', name: 'Chik'},
    // {id: 734541, time: '05:00 AM', type: 'Video', name: 'Chik'},
    // {id: 254358, time: '10:00 AM', type: 'Video', name: 'Chik'},
  ]);

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        {streams.length ? (
          <FlatList
            data={streams}
            style={styles.flatList}
            renderItem={({item}) => <Stream stream={item} />}
            keyExtractor={(item) => 'Stream' + item.id}
            contentContainerStyle={styles.flatListContent}
          />
        ) : (
          <Text>No scheduled streams</Text>
        )}
      </View>
    </View>
  );
};
