import * as React from 'react';
import { View, Text, TextInput } from 'react-native';
import StorageService from '../../services/storageService';
import AppButton from '../common/AppButton';
import styles from '../../styles/styles';
import deckStyles from '../../styles/deckStyles';

class ConfigureCardsScreen extends React.Component {
  constructor(props) {
    super(props);

    const { deckId, cardIndex, cardText } = props.route.params;
    const initialCardText = cardText;

    this.state = {
      deckId,
      cardIndex,
      cardText: initialCardText,
      originalCardText: initialCardText
    };
  }

  onChangeText = (cardText) => this.setState({ cardText });

  goPreviousCard = () => {
    console.log('back');
  };

  goNextCard = () => {
    console.log('next');
  };

  saveCard = async () => {
    const { deckId, cardIndex, cardText } = this.state;
    await StorageService.saveCard(deckId, cardIndex, cardText);
    this.props.navigation.navigate('Deck', { deckId, reloadDeck: true });
  };

  render() {
    const { navigation } = this.props;

    return (
      <View style={[styles.container, deckStyles.configureCardsContainer]}>
        <View style={deckStyles.configCardView}>
          <TextInput
            style={deckStyles.configCardInput}
            onChangeText={this.onChangeText}
            value={this.state.cardText}
            placeholder="If ____, drink ___ sips"
            multiline={true}
          />
        </View>
        <View style={[styles.section, deckStyles.configCardButtons]}>
          <View style={[styles.buttonsRow]}>
            <AppButton title="<" onPress={this.goPreviousCard} />
            <AppButton title=">" onPress={this.goNextCard} />
          </View>
          <View style={[styles.buttonsRow]}>
            <AppButton title="Cancel" onPress={navigation.goBack} />
            <AppButton title="Save" onPress={this.saveCard} />
          </View>
        </View>
      </View>
    );
  }
}

export default ConfigureCardsScreen;
