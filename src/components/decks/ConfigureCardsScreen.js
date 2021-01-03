import * as React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from '../../styles/styles';
import StorageService from '../../services/storageService';
import AppButton from '../common/AppButton';

class ConfigureCardsScreen extends React.Component {
  constructor(props) {
    super(props);

    const { cardIndex, cardText, deck } = props.route.params;
    const initialCardText = cardText ?? 'If ____, drink ___ sips';

    this.state = {
      deck,
      cardIndex,
      cardText: initialCardText,
      originalCardText: initialCardText
    };
  }

  onChangeText = (cardText) => console.log(cardText);
  // this.setState({ cardText })

  saveCard = () => {
    // saviong deck here will need to save entire deckList... need to change to save only deck
  };

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Text>Create your custom cards</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={(text) => onChangeText(text)}
          value={this.state.cardText}
        />
        <View style={[styles.section]}>
          <AppButton title="Cancel" onPress={() => navigation.goBack()} />
          <AppButton title="Save" onPress={() => this.saveCard()} />
        </View>
      </View>
    );
  }
}

export default ConfigureCardsScreen;
