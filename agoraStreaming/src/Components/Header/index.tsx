import React, {FC, useState} from 'react';
import {
  Image,
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {TabNavigation} from '../../Navigation/Tab/types';
import {setCoordinatesAction} from '../../Redux/actions/HomeActions';
import {useAppDispatch, useAppSelector} from '../../Redux/hooks';
import {selectUser} from '../../Redux/selectors/AuthSelectors';
import {selectChannelsList} from '../../Redux/selectors/HomeSelectors';
import {ListChannelsType} from '../../Screens/Home/types';
import {TabNavigationPropsProfileType} from '../../Screens/Profile/types';
import {FoundStreamList} from '../FoundStreamList/FoundStreamList';
import {HeaderStyles} from './styles';
import {CustomHeaderPropsType} from './types';
import {
  faCheckCircle,
  faSearch,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

export const CustomHeader: FC<CustomHeaderPropsType> = (props) => {
  const {title} = props;

  const {width} = useWindowDimensions();
  const styles = HeaderStyles(width);

  const user = useAppSelector(selectUser);
  const channelsList = useAppSelector(selectChannelsList);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<TabNavigationPropsProfileType>();

  // TODO: Animation is not used right now
  // const inputAnimatedRef = useRef(new Animated.Value(0)).current;
  // const inputWidth = width - SIZE_BLOCKS_ITEM * 2 + MARGIN;
  // const opacity = useRef(new Animated.Value(1)).current;

  const [searchMode, setSearchMode] = useState<boolean>(false);

  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResult, setSearchResult] = useState<ListChannelsType[]>([]);

  const onPressSearch = () => {
    setSearchMode(true);
    // TODO: Animation is not used right now
    // showSearchInputAnimation(inputAnimatedRef, inputWidth).start();
    // opacityForHeaderAnimation(opacity, 0).start();
  };

  const onChangeSearchValue = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const streams = channelsList.filter((channel) => {
      const matchFound = channel.name.includes(event.nativeEvent.text);
      const voidString = event.nativeEvent.text === '';

      if (matchFound && !voidString) {
        return channel;
      }
    });
    setSearchResult(streams);
  };

  const resetSearchMode = () => {
    // TODO: Animation is not used right now
    // showSearchInputAnimation(inputAnimatedRef, 0).start();
    // opacityForHeaderAnimation(opacity, 1).start();

    setSearchMode(false);
    setSearchValue('');
    setSearchResult([]);
  };

  const onPressResult = (stream: ListChannelsType) => {
    dispatch(setCoordinatesAction(stream.coords));
    resetSearchMode();
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

  const renderSearchButton = () => {
    if (searchMode) {
      return (
        <TouchableOpacity style={styles.wrapperIcon} onPress={resetSearchMode}>
          <FontAwesomeIcon icon={faCheckCircle} color={'#7adaa8'} size={42} />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity style={styles.wrapperIcon} onPress={onPressSearch}>
          <FontAwesomeIcon icon={faSearch} color={'white'} size={18} />
        </TouchableOpacity>
      );
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.wrapperSectionIcons}>
          <TouchableOpacity onPress={onPressAvatar} style={styles.wrapperIcon}>
            {renderPhoto()}
          </TouchableOpacity>
          {/*<View style={styles.wrapperIcon}>*/}
          {/*  <FontAwesomeIcon icon={faUserPlus} color={'white'} size={20} />*/}
          {/*</View>*/}
        </View>

        <View style={styles.titleContainer}>
          {searchMode ? (
            <TextInput
              style={styles.input}
              onChangeText={setSearchValue}
              onChange={onChangeSearchValue}
              value={searchValue}
              placeholder={'Enter stream name ...'}
              placeholderTextColor={'#fff'}
              autoFocus
            />
          ) : (
            <Text style={styles.title}>{title}</Text>
          )}
        </View>

        <View style={styles.wrapperSectionIcons}>
          {/*<View style={styles.wrapperIcon}>*/}
          {/*  <FontAwesomeIcon icon={faBell} color={'white'} size={18} />*/}
          {/*</View>*/}
          {renderSearchButton()}
        </View>
      </View>
      {!!searchValue && (
        <FoundStreamList
          searchResult={searchResult}
          onPressResult={onPressResult}
        />
      )}
    </View>
  );
};
