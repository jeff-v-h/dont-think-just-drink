import React from 'react';
import { View } from 'react-native';
import styles from '../../styles/styles';
import IconButton from './IconButton';
import { useNavigation } from '@react-navigation/native';

function HeaderMenuButton() {
  const navigation = useNavigation();

  return (
    <View style={styles.headerRightIconWrapper}>
      <IconButton
        onPress={() => navigation.openDrawer()}
        iconName="bars"
        buttonStyle={styles.headerMenuButton}
        size={26}
        opacity={0.5}
      />
    </View>
  );
}

export default HeaderMenuButton;
