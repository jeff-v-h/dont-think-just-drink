import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableHighlight, Text } from 'react-native';
import styles from '../../styles/styles';
import { createStylesArray } from '../../utils/helpers';

ListLinkRow.propTypes = {
  onPress: PropTypes.func,
  text: PropTypes.string,
  buttonStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  numberOfLines: PropTypes.number,
  children: PropTypes.node
};

ListLinkRow.defaultProps = {
  onPress: () => {},
  otherStyle: [],
  numberOfLines: 1,
  children: null
};

function ListLinkRow({ onPress, text, numberOfLines, buttonStyle, children }) {
  const allStyles = createStylesArray(styles.touchableView, buttonStyle);

  return (
    <TouchableHighlight style={styles.touchable} onPress={onPress}>
      <View style={allStyles}>
        <Text style={styles.itemText} numberOfLines={numberOfLines}>
          {text}
        </Text>
        {children}
      </View>
    </TouchableHighlight>
  );
}

export default ListLinkRow;
