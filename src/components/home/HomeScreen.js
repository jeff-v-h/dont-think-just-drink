import * as React from 'react';
import { View, Button, SafeAreaView } from 'react-native';
import { styles } from '../../styles/styles';
import HeaderText from '../common/HeaderText';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={[styles.container, styles.homeScreen]}>
      <View style={styles.menuRow}>
        <Button title="Menu" onPress={() => navigation.toggleDrawer()} />
      </View>
      <View style={styles.section}>
        <HeaderText>Don't Think</HeaderText>
        <HeaderText>Just Drink</HeaderText>
      </View>
      <View style={styles.section}>
        <Button title="Start Drinking" onPress={() => navigation.navigate('Game')} style={styles.button} />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
