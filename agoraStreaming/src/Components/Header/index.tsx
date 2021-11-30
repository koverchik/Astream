import React, {FC, useRef, useState} from 'react';
import {
  Animated,
  Image,
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';

import {setCoordinatesAction} from '../../Redux/actions/HomeActions';
import {useAppDispatch, useAppSelector} from '../../Redux/hooks';
import {selectUser} from '../../Redux/selectors/AuthSelectors';
import {selectChannelsList} from '../../Redux/selectors/HomeSelectors';
import {ListChannelsType} from '../../Screens/Home/types';
import {FoundStreamList} from '../FoundStreamList/FoundStreamList';
import {opacityForHeaderAnimation} from './Animations/opacityForHeader';
import {showSearchInputAnimation} from './Animations/showSearchInput';
import {HeaderStyles, MARGIN, SIZE_BLOCKS_ITEM} from './styles';
import {CustomHeaderPropsType} from './types';
import {
  faBell,
  faCheckCircle,
  faSearch,
  faUser,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

export const CustomHeader: FC<CustomHeaderPropsType> = (props) => {
  const {title} = props;

  const {width} = useWindowDimensions();
  const styles = HeaderStyles(width);
  const inputWidth = width - SIZE_BLOCKS_ITEM * 2 + MARGIN;

  const user = useAppSelector(selectUser);
  const channelsList = useAppSelector(selectChannelsList);
  const dispatch = useAppDispatch();

  const inputAnimatedRef = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const [searchMode, setSearchMode] = useState<boolean>(false);

  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResult, setSearchResult] = useState<ListChannelsType[]>([]);

  const onPressSearch = () => {
    setSearchMode(true);
    showSearchInputAnimation(inputAnimatedRef, inputWidth).start();
    opacityForHeaderAnimation(opacity, 0).start();
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
    showSearchInputAnimation(inputAnimatedRef, 0).start();
    opacityForHeaderAnimation(opacity, 1).start();
    setTimeout(() => {
      setSearchMode(false);
    }, 1720);
    setSearchValue('');
    setSearchResult([]);
  };

  const onPressResult = (stream: ListChannelsType) => {
    dispatch(setCoordinatesAction(stream.coords));
    resetSearchMode();
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
          <FontAwesomeIcon icon={faCheckCircle} color={'#7adaa8'} size={37} />
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
        <Animated.View style={[styles.wrapperSectionIcons, {opacity}]}>
          <View style={styles.wrapperIcon}>{renderPhoto()}</View>
          <View style={styles.wrapperIcon}>
            <FontAwesomeIcon icon={faUserPlus} color={'white'} size={20} />
          </View>
        </Animated.View>
        <Animated.View style={[styles.titleContainer, {opacity}]}>
          <Text style={styles.title}>{title}</Text>
        </Animated.View>
        <View style={styles.wrapperSectionIcons}>
          <Animated.View style={[styles.wrapperIcon, {opacity}]}>
            <FontAwesomeIcon icon={faBell} color={'white'} size={18} />
          </Animated.View>
          {renderSearchButton()}
        </View>
        {searchMode && (
          <Animated.View
            style={[styles.inputContainer, {width: inputAnimatedRef}]}>
            <TextInput
              style={styles.input}
              onChangeText={setSearchValue}
              onChange={onChangeSearchValue}
              value={searchValue}
            />
          </Animated.View>
        )}
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
