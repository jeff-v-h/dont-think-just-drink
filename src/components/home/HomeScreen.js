import * as React from 'react';
import { View, Button, Text } from 'react-native';
import { styles } from '../../styles/styles';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Don't Think</Text>
      <Text>Just Drink</Text>
      <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
      <Button title="Start Drinking" onPress={() => navigation.navigate('Game')} />
    </View>
  );
};

export default HomeScreen;
