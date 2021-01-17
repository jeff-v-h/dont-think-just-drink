import * as React from 'react';
import { View, SafeAreaView, FlatList, Alert, Text } from 'react-native';
import styles from '../../styles/styles';
import deckStyles from '../../styles/deckStyles';
import ListLinkRow from '../common/ListLinkRow';
import standardDeck from '../../utils/decks/standard-deck';
import asianDeck from '../../utils/decks/asian-deck';
import StorageService from '../../services/storageService';
import IconButton from '../common/IconButton';
import { ERROR_TITLE } from '../../utils/constants';

class DeckListScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      decks: [],
      selectedDeckId: props.route.params?.selectedDeckId ?? ''
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
        this.setState({ decks: newDecks, selectedDeckId: newDecks[0].id });
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

  selectDeck = async (id) => {
    if (this.state.selectedDeckId != id) {
      await StorageService.saveSelectedDeckId(id);
      this.setState({ selectedDeckId: id });

      const selectedDeck = this.state.decks.find((d) => d.id === id);
      this.props.navigation.setParams({
        reloadSelection: true,
        selectedDeckId: id,
        selectedDeckName: selectedDeck.name
      });
    }
  };

  navigateToDeck = (deck) => () => {
    this.props.navigation.navigate('Deck', {
      deckId: deck?.id ?? ''
    });
  };

  render() {
    const { decks, selectedDeckId } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.list}>
          <FlatList
            data={decks}
            ListHeaderComponent={<Text style={deckStyles.currentlySelectedHeading}>Selected</Text>}
            ListHeaderComponentStyle={deckStyles.deckListHeader}
            renderItem={({ item }) => (
              <ListLinkRow onPress={() => this.selectDeck(item.id)} text={item.name} viewStyle={deckStyles.listRow}>
                <View style={deckStyles.selectedCol}>
                  {item.id === selectedDeckId && <IconButton iconName="check" buttonStyle={deckStyles.selectedIcon} />}
                </View>
                <Text style={styles.itemText} numberOfLines={1}>
                  {item.name}
                </Text>
                <IconButton
                  iconName="edit"
                  onPress={this.navigateToDeck(item)}
                  size={24}
                  buttonStyle={deckStyles.editDeck}
                />
              </ListLinkRow>
            )}
            keyExtractor={(item) => item.name}
          />
        </View>
        <IconButton
          onPress={this.navigateToDeck()}
          buttonStyle={styles.IconButton}
          iconStyle={styles.floatingActionIcon}
        />
      </SafeAreaView>
    );
  }
}

export default DeckListScreen;
