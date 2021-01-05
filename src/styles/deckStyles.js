import { StyleSheet } from 'react-native';
import { verticalScale, moderateScale } from '../utils/scaling';

const deckStyles = StyleSheet.create({
  listRow: {
    height: verticalScale(50)
  },
  configCardInput: {
    paddingLeft: moderateScale(20),
    paddingRight: moderateScale(20),
    fontSize: moderateScale(24),
    height: verticalScale(300),
    width: '100%'
  },
  configButtonsRow: {
    marginBottom: verticalScale(50)
  }
});

export default deckStyles;
