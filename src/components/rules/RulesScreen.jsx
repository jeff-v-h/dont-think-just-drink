import * as React from 'react';
import { View } from 'react-native';
import AppText from '../common/AppText';
import styles from '../../styles/styles';
import rulesStyles from '../../styles/rulesStyles';

function RulesScreen() {
  return (
    <View style={[styles.container, rulesStyles.screen]}>
      <AppText style={rulesStyles.text}>It's self explanatory</AppText>
      <AppText style={rulesStyles.text}>Read the words, drink your drink.</AppText>
      <AppText style={rulesStyles.text}>Also, take a sip for needing to refer to these rules.</AppText>
    </View>
  );
}

export default RulesScreen;
