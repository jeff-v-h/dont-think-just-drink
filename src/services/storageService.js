import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

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

const saveDecks = async (decks) => {
  try {
    await saveData('decks', decks);
  } catch (e) {
    Alert.alert('Storage Error', 'Unable to store deck list');
  }
};

const getDecks = async () => {
  try {
    return await getData('decks');
  } catch (e) {
    Alert.alert('Storage Error', 'Unable to get deck list');
  }
};

const saveDeck = async (deck) => {
  try {
    const decks = await getDecks();
    const matchingDeckIndex = decks.findIndex((d) => d.id === deck.id);

    if (matchingDeckIndex > -1) {
      decks[matchingDeckIndex] = deck;
    } else {
      decks.push(deck);
    }

    await saveDecks(decks);
  } catch (e) {
    Alert.alert('Storage Error', 'Unable to save deck');
  }
};

const getDeck = async (deckId) => {
  try {
    const decks = await getDecks();
    return decks.find((d) => d.id === deckId);
  } catch (e) {
    Alert.alert('Storage Error', 'Unable to get deck');
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
  saveDeck,
  getDeck,
  saveDecks,
  getDecks,
  saveMostRecentGame,
  getMostRecentGame
};

export default StorageService;
