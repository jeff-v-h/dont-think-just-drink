import { StyleSheet } from 'react-native';
import { moderateScale } from '../utils/scaling';

export const colours = {
  coral: '#FF7F50'
};

export const styles = StyleSheet.create({
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
    color: 'white'
  },
  rulesScreen: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '40%'
  },
  rulesText: {
    marginBottom: moderateScale(20)
  }
});
