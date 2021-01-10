import { StyleSheet } from 'react-native';
import { verticalScale, moderateScale } from '../utils/scaling';
import { colours } from './variables';

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
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%'
  },
  titleInput: {
    paddingLeft: moderateScale(10),
    paddingRight: moderateScale(10),
    marginBottom: verticalScale(10),
    paddingBottom: verticalScale(5),
    fontSize: moderateScale(26),
    width: '100%',
    borderBottomColor: colours.black,
    borderBottomWidth: 1
  }
});

export default deckStyles;
