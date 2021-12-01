import React, {FC} from 'react';
import {
  FlatList,
  FlatListProps,
  ListRenderItem,
  Text,
  useWindowDimensions,
} from 'react-native';

import {StreamType} from '../../Screens/Calendar/types';
import {ListChannelsType} from '../../Screens/Home/types';
import {SearchResultItem} from './SearchResultItem/SearchResultItem';
import {SearchResultStyles} from './styles';
import {SearchResultListPropsType} from './types';

export const SearchResultList: FC<SearchResultListPropsType> = (props) => {
  const {searchResult, onPressResult} = props;

  const {width} = useWindowDimensions();
  const styles = SearchResultStyles(width);

  const renderItem: ListRenderItem<ListChannelsType | StreamType> = (info) => {
    return <SearchResultItem onPressResult={onPressResult} item={info.item} />;
  };

  const listEmptyComponent = () => {
    return <Text style={styles.emptyListTitle}>Nothing found!</Text>;
  };

  const data: FlatListProps<ListChannelsType | StreamType>['data'] =
    searchResult;

  return (
    <FlatList
      style={styles.flatList}
      data={data}
      renderItem={renderItem}
      ListEmptyComponent={listEmptyComponent()}
    />
  );
};
