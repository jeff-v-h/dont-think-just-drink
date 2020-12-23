import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableHighlight, Text } from 'react-native';
import styles from '../../styles/styles';

ListLinkRow.propTypes = {
  onPress: PropTypes.func,
  text: PropTypes.string,
  otherStyles: PropTypes.array
};

ListLinkRow.defaultProps = {
  onPress: () => {},
  otherStyles: []
};

function ListLinkRow({ onPress, text, otherStyles }) {
  const allStyles = otherStyles.length > 0 ? [styles.touchableView, ...otherStyles] : styles.touchableView;

  return (
    <TouchableHighlight style={styles.touchable} onPress={onPress}>
      <View style={allStyles}>
        <Text style={styles.itemText}>{text}</Text>
      </View>
    </TouchableHighlight>
  );
}

export default ListLinkRow;
