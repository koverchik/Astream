import React, {FC, useState} from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {TabNavigation} from '../../Navigation/Tab/types';
import {useAppSelector} from '../../Redux/hooks';
import {selectUser} from '../../Redux/selectors/AuthSelectors';
import {ListChannelsType} from '../../Screens/Home/types';
import {TabNavigationPropsProfileType} from '../../Screens/Profile/types';
import {SearchResultList} from '../SearchResultList/SearchResultList';
import {HeaderStyles} from './styles';
import {CustomHeaderPropsType} from './types';
import {
  faCheckCircle,
  faSearch,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {
  FontAwesomeIcon,
  Props as FontAwesomeIconProps,
} from '@fortawesome/react-native-fontawesome';

export const CustomHeader: FC<CustomHeaderPropsType> = (props) => {
  const {title, placeholderText, filter, onPressResult, searchResult, screen} =
    props;

  const {width} = useWindowDimensions();
  const styles = HeaderStyles(width);

  const user = useAppSelector(selectUser);
  const navigation = useNavigation<TabNavigationPropsProfileType>();

  // TODO: Animation is not used right now
  // const inputAnimatedRef = useRef(new Animated.Value(0)).current;
  // const inputWidth = width - SIZE_BLOCKS_ITEM * 2 + MARGIN;
  // const opacity = useRef(new Animated.Value(1)).current;

  // showSearchInputAnimation(inputAnimatedRef, inputWidth).start();
  // opacityForHeaderAnimation(opacity, 0).start();

  const [searchMode, setSearchMode] = useState<boolean>(false);

  const [searchValue, setSearchValue] = useState<string>('');

  const activeSearchMode = () => {
    setSearchMode((searchMode) => {
      if (searchMode) {
        setSearchValue('');
      }

      return !searchMode;
    });
  };

  const onPressResultItem = (stream: ListChannelsType) => {
    if (onPressResult) {
      onPressResult(stream);
    }
    activeSearchMode();
  };

  const onPressAvatar = () => {
    navigation.navigate(TabNavigation.Profile);
  };

  const renderPhoto = () => {
    if (user?.photo) {
      return <Image source={{uri: user?.photo}} style={styles.image} />;
    } else {
      return <FontAwesomeIcon icon={faUser} color={'white'} size={17} />;
    }
  };

  const getSearchIconProps = (): FontAwesomeIconProps => {
    return {
      icon: searchMode ? faCheckCircle : faSearch,
      color: searchMode ? '#7adaa8' : '#fff',
      size: searchMode ? 42 : 18,
    };
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.wrapperSectionIcons}>
          <TouchableOpacity onPress={onPressAvatar} style={styles.wrapperIcon}>
            {renderPhoto()}
          </TouchableOpacity>
        </View>
        {searchMode ? (
          <View style={styles.titleContainer}>
            <TextInput
              style={styles.input}
              onChangeText={setSearchValue}
              onChange={filter}
              value={searchValue}
              placeholder={placeholderText}
              placeholderTextColor={'#fff'}
              autoFocus
            />
          </View>
        ) : (
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.titleContainer}
            onPress={activeSearchMode}>
            <Text style={styles.title}>{title}</Text>
          </TouchableOpacity>
        )}
        <View style={styles.wrapperSectionIcons}>
          <TouchableOpacity
            style={styles.wrapperIcon}
            onPress={activeSearchMode}>
            <FontAwesomeIcon {...getSearchIconProps()} />
          </TouchableOpacity>
        </View>
      </View>
      {!!searchValue && screen === TabNavigation.Main && (
        <SearchResultList
          searchResult={searchResult}
          onPressResult={onPressResultItem}
        />
      )}
    </View>
  );
};
