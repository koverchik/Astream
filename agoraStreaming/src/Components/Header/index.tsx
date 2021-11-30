import React, {FC} from 'react';
import {Text, View, useWindowDimensions} from 'react-native';

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
