import { StyleSheet } from 'react-native';
import { verticalScale, moderateScale } from '../utils/scaling';

const deckStyles = StyleSheet.create({
  listRow: {
    height: verticalScale(50)
  },
  configureCardsContainer: {
    justifyContent: 'space-around'
  },
  configCardView: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  configCardInput: {
    padding: moderateScale(20),
    fontSize: moderateScale(24)
  }
});

export default deckStyles;
