import React, {FC} from 'react';
import {
  FlatList,
  ListRenderItem,
  Text,
  useWindowDimensions,
} from 'react-native';

import {ListChannelsType} from '../../Screens/Home/types';
import {FoundStreamItem} from './FoundStreamItem/FoundStreamItem';
import {FoundStreamListStyles} from './styles';
import {FoundStreamListPropsType} from './types';

export const FoundStreamList: FC<FoundStreamListPropsType> = (props) => {
  const {searchResult, onPressResult} = props;

  const {width} = useWindowDimensions();
  const styles = FoundStreamListStyles(width);

  const renderItem: ListRenderItem<ListChannelsType> = ({item}) => {
    return <FoundStreamItem onPressResult={onPressResult} stream={item} />;
  };

  const listEmptyComponent = () => {
    return <Text style={styles.emptyListTitle}>Streams is not found!</Text>;
  };

  return (
    <FlatList
      style={styles.flatList}
      data={searchResult}
      renderItem={renderItem}
      ListEmptyComponent={listEmptyComponent()}
    />
  );
};
