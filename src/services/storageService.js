import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'uuid';

const saveData = async (storageKey, value) => {
  const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
  await AsyncStorage.setItem(storageKey, stringValue);
};

const getData = async (storageKey) => {
  const jsonValue = await AsyncStorage.getItem(storageKey);
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

const saveCard = async (deckId, cardIndex, cardText) => {
  const deck = await getDeck(deckId);
  if (!deck) {
    throw new Error('unable to save card because deck does not exist');
  }
  deck.cards[cardIndex] = cardText;
  await saveDeck(deck);
};

const saveMostRecentGame = async (gameState) => {
  await saveData('most-recent-game', gameState);
};

const getMostRecentGame = async () => {
  return await getData('most-recent-game');
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
  saveMostRecentGame,
  getMostRecentGame
};

export default StorageService;
