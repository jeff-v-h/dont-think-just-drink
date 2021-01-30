import * as React from 'react';
import AppText from './AppText';
import { Text } from 'react-native';
import styles from '../../styles/styles';

export default class HeaderText extends React.Component {
  render() {
    return (
      <AppText>
        <Text style={[styles.headerText, this.props.style]}>{this.props.children}</Text>
      </AppText>
    );
  }
}
