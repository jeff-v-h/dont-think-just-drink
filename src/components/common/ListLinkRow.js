import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableHighlight, Text } from 'react-native';
import styles from '../../styles/styles';

ListLinkRow.propTypes = {
  onPress: PropTypes.func,
  text: PropTypes.string,
  flex: PropTypes.number
};

ListLinkRow.defaultProps = {
  onPress: () => {}
};

function ListLinkRow({ onPress, text, flex }) {
  return (
    <TouchableHighlight style={styles.touchable} onPress={onPress}>
      <View style={styles.touchableView}>
        <Text style={[styles.itemText, { flex }]}>{text}</Text>
      </View>
    </TouchableHighlight>
  );
}

export default ListLinkRow;
