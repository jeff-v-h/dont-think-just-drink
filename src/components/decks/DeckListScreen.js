import * as React from 'react';
import { View, SafeAreaView, FlatList, Alert } from 'react-native';
import styles from '../../styles/styles';
import deckStyles from '../../styles/deckStyles';
import ListLinkRow from '../common/ListLinkRow';
import standardDeck from '../../utils/decks/standard-deck';
import asianDeck from '../../utils/decks/asian-deck';
import StorageService from '../../services/storageService';
import FloatingActionButton from '../common/FloatingActionButton';
import { ERROR_TITLE } from '../../utils/constants';

class DeckListScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      decks: []
    };
  }

  componentDidMount() {
    this.loadCustomDecks();
  }

  componentDidUpdate() {
    const { navigation, route } = this.props;
    if (route.params?.reloadDeckList) {
      this.loadCustomDecks();
      navigation.setParams({ reloadDeckList: false });
    }
  }

  loadCustomDecks = async () => {
    try {
      const deckList = await StorageService.getDeckList();

      if (!deckList || deckList.length === 0) {
        const newDecks = [standardDeck, asianDeck];
        await this.saveInitialDecks(newDecks);
        this.setState({ decks: newDecks });
        return;
      }

      this.setState({ decks: deckList });
    } catch (e) {
      Alert.alert(ERROR_TITLE, e.message);
    }
  };

  saveInitialDecks = async (decks) => {
    try {
      await StorageService.saveNewDecks(decks);
    } catch (e) {
      Alert.alert(ERROR_TITLE, e.message);
    }
  };

  navigateToDeck = (deck) => () => {
    this.props.navigation.navigate('Deck', {
      deckId: deck?.id ?? ''
    });
  };

  render() {
    const { decks } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.list}>
          <FlatList
            data={decks}
            renderItem={({ item }) => (
              <ListLinkRow onPress={this.navigateToDeck(item)} text={item.name} otherStyles={[deckStyles.listRow]} />
            )}
            keyExtractor={(item) => item.name}
          />
        </View>
        <FloatingActionButton
          onPress={this.navigateToDeck()}
          buttonStyles={[styles.floatingActionButton]}
          iconStyles={[styles.floatingActionIcon]}
        />
      </SafeAreaView>
    );
  }
}

export default DeckListScreen;
