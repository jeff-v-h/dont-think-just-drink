import React from 'react';
import { TouchableHighlight, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles/styles';

AppButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  style: PropTypes.object,
  textStyle: PropTypes.object,
  disabled: PropTypes.bool
};

AppButton.defaultProps = {
  style: styles.button,
  textStyle: styles.buttonText,
  onPress: () => {},
  disabled: false
};

function AppButton({ title, onPress, style, textStyle, disabled }) {
  return (
    <TouchableHighlight style={disabled ? styles.disabledButton : style} onPress={onPress} disabled={disabled}>
      <Text style={textStyle}>{title}</Text>
    </TouchableHighlight>
  );
}

export default AppButton;
