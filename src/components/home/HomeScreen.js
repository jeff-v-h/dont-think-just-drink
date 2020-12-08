import * as React from 'react';
import { View, Button, Text } from 'react-native';
import { styles } from '../../styles/styles';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Don't Think</Text>
      <Text>Just Drink</Text>
      <Button title="Rules" onPress={() => navigation.navigate('Rules')} />
    </View>
  );
}
