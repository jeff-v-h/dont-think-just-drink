import * as React from 'react';
import { View, SafeAreaView, FlatList, TextInput, Alert } from 'react-native';
import styles from '../../styles/styles';
import deckStyles from '../../styles/deckStyles';
import ListLinkRow from '../common/ListLinkRow';
import FloatingActionButton from '../common/FloatingActionButton';
import StorageService from '../../services/storageService';
import { GameTypesEnum } from '../../utils/enums';
import AppButton from '../common/AppButton';

const errorTitle = 'Error';

class DeckScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      deck: {
        name: '',
        cards: []
      }
    };
  }

  componentDidMount() {
    this.loadDeck();
  }

  componentDidUpdate() {
    const { navigation, route } = this.props;
    if (route.params.reloadDeck) {
      this.loadDeck();
      navigation.setParams({ reloadDeck: false });
    }
  }

  loadDeck = async () => {
    try {
      const { deckId } = this.props.route.params;
      const deck = deckId ? await StorageService.getDeck(deckId) : await this.createNewDeck();
      this.setState({ deck, originalDeckName: deck.name });
    } catch (e) {
      Alert.alert('s', e.message);
    }
  };

  createNewDeck = async () => {
    try {
      const newDeck = {
        name: 'My New Deck',
        cards: [],
        type: GameTypesEnum.custom
      };
      newDeck.id = await StorageService.saveNewDeck(newDeck);
      return newDeck;
    } catch (e) {
      Alert.alert(errorTitle, e.message);
    }
  };

  onChangeDeckName = (text) =>
    this.setState((prevState) => ({
      deck: { ...prevState.deck, name: text }
    }));

  saveDeckName = async () => {
    try {
      const { deck } = this.state;
      await StorageService.updateDeckName(deck);
      this.setState({ originalDeckName: deck.name });
      this.props.navigation.setParams({ reloadDeckList: true });
    } catch (e) {
      Alert.alert(errorTitle, e.message);
    }
  };

  getNavigationToCardFunction = (cardIndex) => () => this.navigateToCard(cardIndex);

  navigateToCard = (cardIndex) =>
    this.props.navigation.navigate('ConfigureCards', {
      deckId: this.state.deck.id,
      cardIndex,
      cards: this.state.deck.cards
    });

  render() {
    const { deck, originalDeckName } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={deckStyles.titleRow}>
          <TextInput style={deckStyles.titleInput} value={deck.name} onChangeText={this.onChangeDeckName} />
          <View style={deckStyles.titleSaveWrapper}>
            <AppButton
              title="Save"
              onPress={this.saveDeckName}
              style={deckStyles.titleSave}
              disabledStyle={deckStyles.titleSaveDisabled}
              textStyle={deckStyles.titleSaveText}
              disabled={deck.name === originalDeckName}
            />
          </View>
        </View>
        <View style={styles.list}>
          <FlatList
            data={deck.cards}
            renderItem={({ item, index }) => (
              <ListLinkRow
                onPress={this.getNavigationToCardFunction(index)}
                text={item}
                numberOfLines={2}
                otherStyles={[deckStyles.listRow]}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <FloatingActionButton
          onPress={() => this.navigateToCard()}
          buttonStyles={[styles.floatingActionButton]}
          iconStyles={[styles.floatingActionIcon]}
        />
      </SafeAreaView>
    );
  }
}

export default DeckScreen;
