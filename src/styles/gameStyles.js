import { StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from '../utils/scaling';
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
  }
});

export default gameStyles;
