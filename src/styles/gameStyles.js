import { StyleSheet } from 'react-native';
import { verticalScale } from '../utils/scaling';
import { colours } from './variables';

const gameStyles = StyleSheet.create({
  selectDeckView: {
    width: '100%'
  },
  selectDeckButton: {
    backgroundColor: colours.white,
    elevation: 5,
    marginTop: verticalScale(5)
  },
  selectDeckText: {
    color: colours.coral
  },
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
