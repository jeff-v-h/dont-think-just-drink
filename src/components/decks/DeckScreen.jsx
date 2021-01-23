import * as React from 'react';
import { View, SafeAreaView, FlatList, TextInput, Alert, Text, Platform } from 'react-native';
import styles from '../../styles/styles';
import deckStyles from '../../styles/deckStyles';
import ListLinkRow from '../common/ListLinkRow';
import IconButton from '../common/IconButton';
import StorageService from '../../services/storageService';
import { GameTypesEnum } from '../../utils/enums';
import AppButton from '../common/AppButton';
import { ERROR_TITLE } from '../../utils/constants';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

class DeckScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      deck: {
        name: '',
        cards: []
      },
      selection: Platform.OS === 'android' ? { start: 0 } : null
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
      this.props.navigation.setParams({ deckId: deck.id });
    } catch (e) {
      Alert.alert(ERROR_TITLE, e.message);
    }
  };

  createNewDeck = async () => {
    try {
      const deckList = await StorageService.getDeckList();
      const newDeck = {
        name: this.getAvailableDeckName(deckList),
        cards: [],
        type: GameTypesEnum.custom
      };
      newDeck.id = await StorageService.saveNewDeck(newDeck);
      return newDeck;
    } catch (e) {
      Alert.alert(ERROR_TITLE, e.message);
    }
  };

  getAvailableDeckName = (deckList) => {
    let name = 'My New Deck';
    let count = 0;
    while (deckList.findIndex((d) => d.name === name) > -1) {
      count++;
      name = 'My New Deck ' + count;
    }
    return name;
  };

  onFocus = () => {
    if (Platform.OS === 'android') {
      this.setState({ selection: null });
    }
  };

  onBlur = () => {
    if (Platform.OS === 'android') {
      this.setState({ selection: { start: 0, end: 0 } });
    }
  };

  _menu = null;

  setMenuRef = ref => this._menu = ref;

  onChangeDeckName = (text) =>
    this.setState((prevState) => ({
      deck: { ...prevState.deck, name: text }
    }));

  saveDeckName = async () => {
    try {
      const { deck } = this.state;
      await StorageService.updateDeckName(deck);
      this.setState({ originalDeckName: deck.name });
    } catch (e) {
      Alert.alert(ERROR_TITLE, e.message);
    }
  };

  confirmDelete = async () => {
    const selectedDeck = await StorageService.getSelectedDeck();
    if (selectedDeck.id === this.state.deck.id) {
      Alert.alert('', 'Cannot delete a selected deck');
      return;
    }

    Alert.alert('Confirm Delete', 'Are you sure you want to permanently remove this deck from your device?', [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'Delete',
        onPress: async () => {
          await StorageService.deleteDeck(this.state.deck.id);
          this.props.navigation.navigate('DeckList', { reloadDeckList: true });
        }
      }
    ]);
  };

  getNavigationToCardFunction = (cardIndex) => () => this.navigateToCard(cardIndex);

  navigateToCard = (cardIndex) => {
    const { deck } = this.state;
    this.props.navigation.navigate('ConfigureCards', {
      deckId: deck.id,
      cardIndex,
      cards: deck.cards
    });
  };

  showMenu = () => this._menu.show();
  hideMenu = () => this._menu.hide();

  render() {
    const { deck, originalDeckName, selection } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={deckStyles.titleRow}>
          <TextInput
            style={deckStyles.titleInput}
            value={deck.name}
            onChangeText={this.onChangeDeckName}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            selection={selection}
          />
          <View style={deckStyles.menuWrapper}>
            <Menu
              ref={this.setMenuRef}
              button={<IconButton onPress={this.showMenu} iconName="ellipsis-v" size={24} opacity={0.5} />}
            >
              <MenuItem onPress={this.saveDeckName} disabled={deck.name === originalDeckName}>Save Name</MenuItem>
              <MenuItem onPress={this.confirmDelete}>Delete</MenuItem>
            </Menu>
          </View>
        </View>
        <View style={styles.list}>
          <FlatList
            data={deck.cards}
            renderItem={({ item, index }) => (
              <ListLinkRow
                onPress={this.getNavigationToCardFunction(index)}
                viewStyle={[deckStyles.listRow, deckStyles.deckListRow]}
              >
                <Text style={styles.itemText} numberOfLines={2}>
                  {item}
                </Text>
              </ListLinkRow>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <IconButton
          onPress={() => this.navigateToCard()}
          buttonStyle={styles.IconButton}
          iconStyle={styles.floatingActionIcon}
        />
      </SafeAreaView>
    );
  }
}

export default DeckScreen;
