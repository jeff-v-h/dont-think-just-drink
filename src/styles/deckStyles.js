import { StyleSheet } from 'react-native';
import { verticalScale, moderateScale, scale } from '../utils/scaling';
import { colours } from './variables';

const selectedColWidth = moderateScale(56);

const deckStyles = StyleSheet.create({
  listRow: {
    height: verticalScale(50)
  },
  deckListRow: {
    paddingLeft: moderateScale(20),
    paddingRight: moderateScale(20)
  },
  deckListHeader: {
    borderBottomWidth: 1,
    paddingBottom: moderateScale(10)
  },
  currentlySelectedHeading: {
    width: selectedColWidth,
    textAlign: 'center'
  },
  selectedCol: {
    width: selectedColWidth,
    marginRight: moderateScale(10)
  },
  selectedIcon: {
    alignSelf: 'center'
  },
  editDeck: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: moderateScale(10),
    paddingLeft: moderateScale(13)
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
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: verticalScale(10),
    borderBottomColor: colours.black,
    borderBottomWidth: 1
  },
  titleView: {
    flex: 1,
    paddingLeft: moderateScale(10),
    paddingRight: moderateScale(10)
  },
  title: {
    fontSize: moderateScale(22)
  },
  titleInput: {
    flex: 1,
    paddingLeft: moderateScale(10),
    paddingRight: moderateScale(10),
    fontSize: moderateScale(26)
  },
  menuWrapper: {
    padding: moderateScale(5),
    marginRight: moderateScale(5),
    marginLeft: moderateScale(5)
  }
});

export default deckStyles;
