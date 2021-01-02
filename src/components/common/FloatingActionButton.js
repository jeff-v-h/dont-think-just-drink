import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';

FloatingActionButton.propTypes = {
  onPress: PropTypes.func,
  buttonStyles: PropTypes.array,
  iconStyles: PropTypes.array
};

FloatingActionButton.defaultProps = {
  onPress: () => {},
  buttonStyles: [],
  iconStyles: []
};

function FloatingActionButton({ onPress, buttonStyles, iconStyles }) {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={buttonStyles}>
      <Icon name="plus" size={18} style={iconStyles} />
    </TouchableOpacity>
  );
}

export default FloatingActionButton;
