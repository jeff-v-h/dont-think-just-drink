import { StyleSheet } from 'react-native';
import { verticalScale } from '../utils/scaling';
import { colours } from './variables';

const gameStyles = StyleSheet.create({
  cardTextSection: {
    flex: 3
  },
  cardButtonsSection: {
    flex: 2
  },
  mostRecentButtonRow: {
    flex: 1,
    marginTop: verticalScale(30)
  }
});

export default gameStyles;
