import React from 'react';
import { TouchableHighlight, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles/styles';
import { createStylesArray } from '../../utils/helpers';

AppButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  textStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  disabled: PropTypes.bool,
  disabledStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  numberOfLines: PropTypes.number
};

AppButton.defaultProps = {
  onPress: () => {},
  disabled: false,
  style: [],
  textStyle: [],
  disabledStyle: [],
  numberOfLines: 0
};

function AppButton({ title, onPress, disabled, style, disabledStyle, textStyle, numberOfLines }) {
  const buttonStyles = disabled
    ? createStylesArray(styles.disabledButton, disabledStyle)
    : createStylesArray(styles.button, style);

  const allTextStyles = createStylesArray(styles.buttonText, textStyle);

  return (
    <TouchableHighlight style={buttonStyles} onPress={onPress} disabled={disabled}>
      <Text style={allTextStyles} numberOfLines={numberOfLines}>
        {title}
      </Text>
    </TouchableHighlight>
  );
}

export default AppButton;
