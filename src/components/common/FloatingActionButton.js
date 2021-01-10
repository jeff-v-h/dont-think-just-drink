import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';

FloatingActionButton.propTypes = {
  onPress: PropTypes.func,
  buttonStyles: PropTypes.array,
  opacity: PropTypes.number,
  iconName: PropTypes.string,
  size: PropTypes.number,
  iconStyles: PropTypes.array
};

FloatingActionButton.defaultProps = {
  onPress: () => {},
  buttonStyles: [],
  opacity: 0.7,
  iconName: 'plus',
  size: 18,
  iconStyles: []
};

function FloatingActionButton({ onPress, buttonStyles, opacity, iconName, size, iconStyles }) {
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyles} activeOpacity={opacity}>
      <Icon name={iconName} size={size} style={iconStyles} />
    </TouchableOpacity>
  );
}

export default FloatingActionButton;
