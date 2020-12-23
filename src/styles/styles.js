import { StyleSheet } from 'react-native';
import { moderateScale, scale } from '../utils/scaling';
import { colours } from './variables';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(10)
  },
  text: {
    fontSize: moderateScale(24),
    textAlign: 'center'
  },
  headerText: {
    fontSize: moderateScale(30),
    textAlign: 'center'
  },
  section: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  list: {
    flex: 1,
    width: '100%'
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%'
  },
  button: {
    backgroundColor: colours.coral,
    padding: moderateScale(6),
    borderRadius: 2
  },
  buttonText: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: moderateScale(20),
    color: colours.white
  },
  touchable: {
    width: '100%',
    paddingTop: scale(5),
    paddingBottom: scale(5),
    paddingLeft: '3%',
    paddingRight: '3%',
    borderBottomWidth: 1
  },
  touchableView: {
    height: '100%',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  itemText: {
    fontSize: moderateScale(20)
  }
});

export default styles;
