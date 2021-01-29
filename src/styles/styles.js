import { StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from '../utils/scaling';
import { colours } from './variables';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(10)
  },
  scrollContainer: {
    flex: 1,
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
  flexStart: {
    justifyContent: 'flex-start'
  },
  list: {
    flex: 1,
    width: '100%'
  },
  topButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    minHeight: verticalScale(30),
    paddingRight: moderateScale(5),
    paddingLeft: moderateScale(5)
  },
  button: {
    backgroundColor: colours.coral,
    padding: moderateScale(6),
    borderRadius: 2,
    minWidth: scale(80)
  },
  disabledButton: {
    backgroundColor: colours.grey,
    padding: moderateScale(6),
    borderRadius: 2,
    minWidth: scale(80)
  },
  buttonText: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: moderateScale(20),
    color: colours.white
  },
  buttonsRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: verticalScale(10)
  },
  touchable: {
    width: '100%',
    paddingTop: scale(5),
    paddingBottom: scale(5),
    borderBottomWidth: 1,
    borderBottomColor: colours.grey
  },
  touchableView: {
    height: '100%',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  itemText: {
    fontSize: moderateScale(20),
    flex: 1
  },
  IconButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    backgroundColor: colours.coral,
    borderColor: colours.coral,
    borderRadius: 200 / 2
  },
  floatingActionIcon: {
    color: colours.white
  },
  headerRightIconWrapper: {
    justifyContent: 'center',
    flex: 1,
    paddingRight: moderateScale(14)
  },
  bold: {
    fontWeight: '700'
  },
  bottomPopup: {
    padding: moderateScale(10)
  }
});

export default styles;
