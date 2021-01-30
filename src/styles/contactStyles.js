import { StyleSheet } from 'react-native';
import { moderateScale } from '../utils/scaling';

const contactStyles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: '30%',
    paddingTop: '30%'
  },
  text: {
    marginBottom: moderateScale(20)
  }
});

export default contactStyles;
