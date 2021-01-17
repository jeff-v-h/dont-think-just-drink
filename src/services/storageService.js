import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'uuid';

const saveData = async (storageKey, value) => {
  const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
  await AsyncStorage.setItem(storageKey, stringValue);
};

const getStringData = async (storageKey) => await AsyncStorage.getItem(storageKey);

const getData = async (storageKey) => {
  const jsonValue = await getStringData(storageKey);
  return jsonValue != null ? JSON.parse(jsonValue) : null;
};

const deleteData = async (storageKey) => {
  await AsyncStorage.removeItem(storageKey);
};

const clearAllData = async () => {
  await AsyncStorage.clear();
  console.log('all cleared');
};

const saveDeckList = async (deckList) => {
  await saveData('deckList', deckList);
};

const getDeckList = async () => {
  return await getData('deckList');
};

const clearDeckList = async () => {
  await saveData('deckList', []);
  console.log('deck list cleared');
};

const saveDeck = async (deck) => {
  await saveData(`deck:${deck.id}`, deck);
};

const getDeck = async (deckId) => {
  return await getData(`deck:${deckId}`);
};

const deleteDeck = async (deckId) => {
  const deckList = await getDeckList();
  const newDeckList = deckList.filter((d) => d.id !== deckId);

  await Promise.all(saveDeckList(newDeckList), deleteData(`deck:${deckId}`));
};

const updateDeckName = async (deck) => {
  const deckList = await getDeckList();

  if (deckList.some((d) => d.name.toLowerCase() === deck.name.toLowerCase() && d.id !== deck.id)) {
    throw new Error('Deck name already exists');
  }

  const deckIndex = deckList.findIndex((d) => d.id === deck.id);

  if (deckIndex === -1) {
    throw new Error('Deck could not be found');
  }

  deckList[deckIndex].name = deck.name;

  await Promise.all([saveDeckList(deckList), saveDeck(deck)]);
};

const saveNewDeck = async (newDeck) => {
  const deckList = (await getDeckList()) ?? [];

  if (!newDeck.id) {
    newDeck.id = uuid.v1();
  }

  const { cards, ...newDeckReference } = newDeck;
  deckList.push(newDeckReference);

  await Promise.all([saveDeckList(deckList), saveDeck(newDeck)]);

  return newDeck.id;
};

const saveNewDecks = async (newDecks) => {
  const deckList = (await getDeckList()) ?? [];
  const promises = [];

  newDecks.forEach((newDeck) => {
    if (!newDeck.id) {
      newDeck.id = uuid.v1();
    }

    const { cards, ...newDeckReference } = newDeck;

    deckList.push(newDeckReference);
    promises.push(saveDeck(newDeck));
  });

  promises.push(saveDeckList(deckList));

  await Promise.all(promises);
};

const saveCard = async (deckId, cardText, cardIndex) => {
  const deck = await getDeck(deckId);
  if (!deck) {
    throw new Error('Unable to save card because deck does not exist');
  }

  if (cardIndex || cardIndex === 0) {
    deck.cards[cardIndex] = cardText;
  } else {
    deck.cards.push(cardText);
  }

  await saveDeck(deck);
};

const saveNewCard = async (deckId, cardText) => {
  await saveCard(deckId, cardText);
};

const deleteCard = async (deckId, cardIndex) => {
  const deck = await getDeck(deckId);

  if (!deck) {
    throw new Error('Unable to delete card because deck does not exist');
  }
  if (cardIndex < 0 || cardIndex >= deck.cards.length) {
    throw new Error(`Card with index ${cardIndex} does not exist in deck`);
  }

  deck.cards.splice(cardIndex, 1);
  await saveDeck(deck);
};

const saveMostRecentGame = async (gameState) => {
  await saveData('most-recent-game', gameState);
};

const getMostRecentGame = async () => {
  return await getData('most-recent-game');
};

const saveSelectedDeckId = async (deckId) => await saveData('selected-deck', deckId);
const getSelectedDeck = async () => {
  const deckId = await getStringData('selected-deck');
  return await getDeck(deckId);
};

const StorageService = {
  clearAllData,
  saveDeck,
  getDeck,
  updateDeckName,
  saveDeckList,
  getDeckList,
  clearDeckList,
  saveNewDeck,
  saveNewDecks,
  deleteDeck,
  saveCard,
  saveNewCard,
  deleteCard,
  saveMostRecentGame,
  getMostRecentGame,
  saveSelectedDeckId,
  getSelectedDeck
};

export default StorageService;
