import React from 'react';
import { View, Text } from 'react-native';
import legalStyles from '../../styles/legalStyles';
import { DISCLAIMER, LEGAL_RECOMMENDATION } from '../../utils/constants';

function DisclaimerScreen() {
  return (
    <View style={legalStyles.disclaimerContainer}>
      <Text style={legalStyles.subHeading}>DRINK RESPONSIBLY:</Text>
      <Text style={legalStyles.text}>{LEGAL_RECOMMENDATION}</Text>
      <Text style={legalStyles.subHeading}>DISCLAIMER:</Text>
      <Text style={legalStyles.text}>{DISCLAIMER}</Text>
    </View>
  );
}

export default DisclaimerScreen;
