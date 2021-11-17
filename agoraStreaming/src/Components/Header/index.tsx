import {
  faBell,
  faSearch,
  faUser,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {FC} from 'react';
import {Animated, Dimensions, Text, View} from 'react-native';
import {styles} from './styles';
import {HeaderAppType} from './types';

export const HeaderApp: FC<HeaderAppType> = (props) => {
  const {title} = props;

  return (
    <View style={styles.container}>
      <View style={styles.wrapperSectionIcons}>
        <View style={styles.wrapperIcon}>
          <FontAwesomeIcon icon={faUser} color={'white'} size={17} />
        </View>
        <View style={styles.wrapperIcon}>
          <FontAwesomeIcon icon={faUserPlus} color={'white'} size={20} />
        </View>
      </View>
      <Text style={styles.title}>{title}</Text>
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
