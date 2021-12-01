import React, {FC} from 'react';
import {FlatList, ListRenderItem, Text} from 'react-native';

import {ListChannelsType} from '../../Screens/Home/types';
import {SearchResultItem} from './SearchResultItem/SearchResultItem';
import {styles} from './styles';
import {SearchResultListPropsType} from './types';

export const SearchResultList: FC<SearchResultListPropsType> = (props) => {
  const {searchResult, onPressResult} = props;

  const renderItem: ListRenderItem<ListChannelsType> = ({item}) => {
    return <SearchResultItem onPressResult={onPressResult} item={item} />;
  };

  const listEmptyComponent = () => {
    return <Text style={styles.emptyListTitle}>Nothing found!</Text>;
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
