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

const saveCard = async (deckId, cardIndex, cardText) => {
  try {
    const deck = await getDeck(deckId);
    if (!deck) {
      throw new Error('unable to save card because deck does not exist');
    }
    console.log('before', deck.cards[cardIndex]);
    deck.cards[cardIndex] = cardText;
    console.log('after', deck.cards[cardIndex]);
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
  saveDeck,
  getDeck,
  saveDeckList,
  getDeckList,
  saveCard,
  saveMostRecentGame,
  getMostRecentGame
};

export default StorageService;
