import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from '../utils/scaling';

const legalStyles = StyleSheet.create({
  disclaimerContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: moderateScale(20),
    paddingHorizontal: moderateScale(14)
  },
  subHeading: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    alignSelf: 'flex-start'
  },
  text: {
    marginBottom: verticalScale(30),
    fontSize: moderateScale(16)
  }
});

export default legalStyles;
