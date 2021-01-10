import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import uuid from 'uuid';

const saveData = async (storageKey, value) => {
  try {
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
    await AsyncStorage.setItem(storageKey, stringValue);
  } catch (e) {
    Alert.alert('Storage Error', 'Unable to save to phone storage.');
  }
};

const getData = async (storageKey) => {
  try {
    const jsonValue = await AsyncStorage.getItem(storageKey);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    Alert.alert('Storage Error', 'Unable to get data from phone storage.');
  }
};

const clearAllData = async () => {
  await AsyncStorage.clear();
  console.log('all cleared');
};

const saveDeckList = async (deckList) => {
  try {
    await saveData('deckList', deckList);
  } catch (e) {
    Alert.alert('Storage Error', 'Unable to store deck list');
  }
};

const getDeckList = async () => {
  try {
    return await getData('deckList');
  } catch (e) {
    Alert.alert('Storage Error', 'Unable to get deck list');
  }
};

const clearDeckList = async () => {
  try {
    await saveData('deckList', []);
  } catch (e) {
    Alert.alert('Storage Error', 'Unable to clear deck list');
  }
};

const saveDeck = async (deck) => {
  try {
    await saveData(`deck:${deck.id}`, deck);
  } catch (e) {
    Alert.alert('Storage Error', 'Unable to save deck');
  }
};

const getDeck = async (deckId) => {
  try {
    return await getData(`deck:${deckId}`);
  } catch (e) {
    Alert.alert('Storage Error', 'Unable to get deck');
  }
};

const saveNewDeck = async (newDeck) => {
  try {
    let deckList = await getDeckList();

    if (!deckList) {
      deckList = [];
    }

    if (!newDeck.id) {
      newDeck.id = uuid.v1();
    }

    const newDeckReference = { ...newDeck };
    delete newDeckReference.cards;
    deckList.push(newDeckReference);

    await Promise.all([saveDeckList(deckList), saveDeck(newDeck)]);

    return newDeck.id;
  } catch (e) {
    Alert.alert('Storage Error', 'Unable to save new deck');
  }
};

const saveCard = async (deckId, cardIndex, cardText) => {
  try {
    const deck = await getDeck(deckId);
    if (!deck) {
      throw new Error('unable to save card because deck does not exist');
    }
    deck.cards[cardIndex] = cardText;
    await saveDeck(deck);
  } catch (e) {
    Alert.alert('Storage Error', 'Unable to save card');
  }
};

const saveMostRecentGame = async (gameState) => {
  try {
    await saveData('most-recent-game', gameState);
  } catch (e) {
    Alert.alert('Storage Error', 'Unable to auto save');
  }
};

const getMostRecentGame = async () => {
  try {
    return await getData('most-recent-game');
  } catch (e) {
    Alert.alert('Storage Error', 'Unable to get most recent game');
  }
};

const StorageService = {
  clearAllData,
  saveDeck,
  getDeck,
  saveDeckList,
  getDeckList,
  clearDeckList,
  saveNewDeck,
  saveCard,
  saveMostRecentGame,
  getMostRecentGame
};

export default StorageService;
