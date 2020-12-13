import { StyleSheet } from 'react-native';
import { moderateScale } from '../utils/scaling';

const rulesStyles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '40%'
  },
  text: {
    marginBottom: moderateScale(20)
  }
});

export default rulesStyles;
