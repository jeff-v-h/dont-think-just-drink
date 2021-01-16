import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStylesArray } from '../../utils/helpers';

IconButton.propTypes = {
  onPress: PropTypes.func,
  buttonStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  opacity: PropTypes.number,
  iconName: PropTypes.string,
  size: PropTypes.number,
  iconStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

IconButton.defaultProps = {
  onPress: () => {},
  buttonStyle: [],
  opacity: 0.7,
  iconName: 'plus',
  size: 18,
  iconStyle: []
};

function IconButton({ onPress, buttonStyle, opacity, iconName, size, iconStyle }) {
  return (
    <TouchableOpacity onPress={onPress} style={createStylesArray(buttonStyle)} activeOpacity={opacity}>
      <Icon name={iconName} size={size} style={createStylesArray(iconStyle)} />
    </TouchableOpacity>
  );
}

export default IconButton;
