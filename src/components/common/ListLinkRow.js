import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableHighlight } from 'react-native';
import styles from '../../styles/styles';
import { createStylesArray } from '../../utils/helpers';

ListLinkRow.propTypes = {
  onPress: PropTypes.func,
  viewStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  children: PropTypes.node
};

ListLinkRow.defaultProps = {
  onPress: () => {},
  viewStyle: [],
  children: null
};

function ListLinkRow({ onPress, viewStyle, children }) {
  const style = createStylesArray(styles.touchableView, viewStyle);

  return (
    <TouchableHighlight style={styles.touchable} onPress={onPress}>
      <View style={style}>{children}</View>
    </TouchableHighlight>
  );
}

export default ListLinkRow;
