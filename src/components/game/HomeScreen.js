import * as React from 'react';
import { View, SafeAreaView } from 'react-native';
import { styles } from '../../styles/styles';
import HeaderText from '../common/HeaderText';
import AppButton from '../common/AppButton';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.menuRow}>
        <AppButton title="Menu" onPress={() => navigation.toggleDrawer()} />
      </View>
      <View style={styles.section}>
        <HeaderText>Don't Think</HeaderText>
        <HeaderText>Just Drink</HeaderText>
      </View>
      <View style={styles.section}>
        <AppButton title="Start Drinking" onPress={() => navigation.navigate('Game')} style={styles.button} />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
