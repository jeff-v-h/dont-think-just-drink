import * as React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from '../../styles/styles';

class ConfigureCardsScreen extends React.Component {
  constructor(props) {
    super(props);

    const { cardIndex, cardText } = props.route.params;

    this.state = {
      cardIndex,
      cardText: cardText ?? 'If ____, drink ___ sips'
    };
  }

  onChangeText = (cardText) => console.log(cardText);
  // this.setState({ cardText })

  render() {
    return (
      <View style={styles.container}>
        <Text>Create your custom cards</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={(text) => onChangeText(text)}
          value={this.state.cardText}
        />
      </View>
    );
  }
}

export default ConfigureCardsScreen;
