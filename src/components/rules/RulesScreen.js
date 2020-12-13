import * as React from 'react';
import { View } from 'react-native';
import { styles } from '../../styles/styles';
import AppText from '../common/AppText';

function RulesScreen() {
  return (
    <View style={[styles.container, styles.rulesScreen]}>
      <AppText style={styles.rulesText}>It's self explanatory</AppText>
      <AppText style={styles.rulesText}>Read the words, drink your drink.</AppText>
      <AppText style={styles.rulesText}>Also, take a sip for needing to refer to these rules.</AppText>
    </View>
  );
}

export default RulesScreen;
