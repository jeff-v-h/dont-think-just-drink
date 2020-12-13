import React from 'react';
import { TouchableHighlight, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles/styles';

AppButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  style: PropTypes.object,
  textStyle: PropTypes.object
};

AppButton.defaultProps = {
  style: styles.button,
  textStyle: styles.buttonText,
  onPress: () => {}
};

function AppButton({ title, onPress, style, textStyle }) {
  return (
    <TouchableHighlight style={style} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </TouchableHighlight>
  );
}

export default AppButton;
