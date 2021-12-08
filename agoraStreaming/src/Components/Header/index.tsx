import React, {FC} from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {Colors} from '../../Colors/colors';
import {TabNavigation} from '../../Navigation/Tab/types';
import {useAppSelector} from '../../Redux/hooks';
import {selectUser} from '../../Redux/selectors/AuthSelectors';
import {TabNavigationPropsProfileType} from '../../Screens/Profile/types';
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
  const {
    title,
    placeholderText,
    filter,
    onChangeInputText,
    inputValue,
    searchMode,
    onChangeSearchMode,
  } = props;

  const {width} = useWindowDimensions();
  const styles = HeaderStyles(width);

  const user = useAppSelector(selectUser);
  const navigation = useNavigation<TabNavigationPropsProfileType>();

  const onPressAvatar = () => {
    navigation.navigate(TabNavigation.Profile);
  };

  const renderPhoto = () => {
    if (user?.photo) {
      return <Image source={{uri: user?.photo}} style={styles.image} />;
    } else {
      return <FontAwesomeIcon icon={faUser} color={Colors.white} size={17} />;
    }
  };

  const getSearchIconProps = (): FontAwesomeIconProps => {
    return {
      icon: searchMode ? faCheckCircle : faSearch,
      color: searchMode ? Colors.bermuda : Colors.white,
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
              onChangeText={onChangeInputText}
              onChange={filter}
              value={inputValue}
              placeholder={placeholderText}
              placeholderTextColor={Colors.white}
              autoFocus
            />
          </View>
        ) : (
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.titleContainer}
            onPress={onChangeSearchMode}>
            <Text style={styles.title}>{title}</Text>
          </TouchableOpacity>
        )}
        <View style={styles.wrapperSectionIcons}>
          <TouchableOpacity
            style={styles.wrapperIcon}
            onPress={onChangeSearchMode}>
            <FontAwesomeIcon {...getSearchIconProps()} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
