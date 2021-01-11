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
  onPress: () => {},
  disabled: false
};

function AppButton({ title, onPress, disabled, style, disabledStyle, textStyle }) {
  const allStyles = [disabled ? styles.disabledButton : styles.button];

  if (disabled && disabledStyle) {
    allStyles.push(disabledStyle);
  }
  if (!disabled && style) {
    allStyles.push(style);
  }

  const allTextStyles = [styles.buttonText];
  if (textStyle) {
    allTextStyles.push(textStyle);
  }

  return (
    <TouchableHighlight style={allStyles} onPress={onPress} disabled={disabled}>
      <Text style={allTextStyles}>{title}</Text>
    </TouchableHighlight>
  );
}

export default AppButton;
