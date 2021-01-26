import React from 'react';
import { View, Text } from 'react-native';
import styles from '../../styles/styles';
import legalStyles from '../../styles/legalStyles';

function DisclaimerScreen() {
  return (
    <View style={styles.container}>
      <Text style={legalStyles.text}>DISCLAIMER: Recaura, it's heirs, assigns, representatives, employees and agents bear no responsibility and are not liable for special or consequential damages or incidents resulting from the use, misuse, inability to use or interpretation of the contents of this product regardless of whether Recaura has been advised of the possibility of such damages or incidents.</Text>
    </View>
  );
}

export default DisclaimerScreen;
