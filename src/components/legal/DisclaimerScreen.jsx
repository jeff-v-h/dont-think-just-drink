import React from 'react';
import { View, Text } from 'react-native';
import styles from '../../styles/styles';
import legalStyles from '../../styles/legalStyles';
import { DISCLAIMER } from '../../utils/constants';

function DisclaimerScreen() {
  return (
    <View style={styles.container}>
      <Text style={legalStyles.text}>DISCLAIMER: {DISCLAIMER}</Text>
    </View>
  );
}

export default DisclaimerScreen;
