import * as React from 'react';
import { View } from 'react-native';
import AppText from '../common/AppText';
import styles from '../../styles/styles';
import contactStyles from '../../styles/contactStyles';

function ContactUsScreen() {
  return (
    <View style={[styles.container, contactStyles.screen]}>
      <AppText style={contactStyles.text}>Found any errors or got any feedback?</AppText>
      <AppText style={contactStyles.text}>Please send an email to hello@recaura.com!</AppText>
    </View>
  );
}

export default ContactUsScreen;
