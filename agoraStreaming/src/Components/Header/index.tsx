import React, {FC} from 'react';
import {Image, Text, View, useWindowDimensions} from 'react-native';

import {useAppSelector} from '../../Redux/hooks';
import {selectUser} from '../../Redux/selectors/AuthSelectors';
import {HeaderStyles} from './styles';
import {CustomHeaderPropsType} from './types';
import {
  faBell,
  faSearch,
  faUser,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

export const CustomHeader: FC<CustomHeaderPropsType> = (props) => {
  const {title} = props;

  const {width} = useWindowDimensions();
  const styles = HeaderStyles(width);

  const user = useAppSelector(selectUser);

  return (
    <View style={styles.container}>
      <View style={styles.wrapperSectionIcons}>
        <View style={styles.wrapperIcon}>
          {user?.photo ? (
            <Image source={{uri: user?.photo}} style={styles.image} />
          ) : (
            <FontAwesomeIcon icon={faUser} color={'white'} size={17} />
          )}
        </View>
        <View style={styles.wrapperIcon}>
          <FontAwesomeIcon icon={faUserPlus} color={'white'} size={20} />
        </View>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.wrapperSectionIcons}>
        <View style={styles.wrapperIcon}>
          <FontAwesomeIcon icon={faBell} color={'white'} size={18} />
        </View>
        <View style={styles.wrapperIcon}>
          <FontAwesomeIcon icon={faSearch} color={'white'} size={18} />
        </View>
      </View>
    </View>
  );
};
