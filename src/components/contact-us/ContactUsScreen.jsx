import * as React from 'react';
import { View } from 'react-native';
import AppText from '../common/AppText';
import styles from '../../styles/styles';
import contactStyles from '../../styles/contactStyles';

function ContactUsScreen() {
  return (
    <View style={[styles.container, contactStyles.screen]}>
      <View style={styles.section}>
        <AppText style={contactStyles.text}>Want to make this game even more fun to play?</AppText>
        <AppText style={contactStyles.text}>Or maybe you've found an error?</AppText>
        <AppText style={contactStyles.text}>Either way, we would love to hear from you!</AppText>
      </View>
      <View style={styles.section}>
        <AppText style={contactStyles.text}>Feel free to send an email to:</AppText>
        <AppText style={contactStyles.text}>hello@recaura.com</AppText> 
      </View>
    </View>
  );
}

export default ContactUsScreen;
