import * as React from 'react';
import { View, Button, Text, TextInput } from 'react-native';
import { styles } from '../../styles/styles';

const ConfigureCardsScreen = ({ navigation }) => {
  const [value, onChangeText] = React.useState('If ____, drink ___ sips');

  return (
    <View style={styles.container}>
      <Text>Create your custom cards</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={(text) => onChangeText(text)}
        value={value}
      />
    </View>
  );
};

export default ConfigureCardsScreen;
