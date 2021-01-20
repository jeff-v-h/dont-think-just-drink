import * as React from 'react';
import { View, SafeAreaView, Alert } from 'react-native';
import styles from '../../styles/styles';
import AppText from '../common/AppText';
import AppButton from '../common/AppButton';
import StorageService from '../../services/storageService';
import uuid from 'uuid';
import gameStyles from '../../styles/gameStyles';
import { ERROR_TITLE } from '../../utils/constants';

class GameScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.getInitialState();
  }

  componentDidMount() {
    this.setupGame();
  }

  componentDidUpdate() {
    if (this.props.route.params.newGame) {
      this.setupGame();
    }
  }

  getInitialState = () => ({
    played: [],
    cardPile: [],
    cardIndexToShow: -1,
    gameId: uuid.v1()
  });

  setupGame = async () => {
    try {
      const { route, navigation } = this.props;

      let deckId = route.params?.deckId ?? (await StorageService.getSelectedDeck()).id;
      const deck = await StorageService.getDeck(deckId);

      navigation.setParams({ newGame: false, deckName: deck.name });
      this.setState({ ...this.getInitialState(), cardPile: deck.cards }, this.playNewCard);
    } catch (e) {
      Alert.alert(ERROR_TITLE, 'Unable to get selected deck');
    }
  };

  // min and max included as possible outcomes
  randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  getRandomCard = () => {
    const { cardPile: cardPile } = this.state;
    const randomNum = this.randomIntFromInterval(0, deck.length - 1);
    return cardPile[randomNum];
  };

  playNextCard = () => {
    const { played, cardIndexToShow } = this.state;
    // If it is currently on the most recently played card, then play new card, otherwise go to next index
    if (cardIndexToShow == played.length - 1) {
      this.playNewCard();
      return;
    }

    this.setState({ cardIndexToShow: cardIndexToShow + 1 });
  };

  playNewCard = () => {
    const { played, cardPile: cardPile, cardIndexToShow } = this.state;
    const randomIndex = this.randomIntFromInterval(0, cardPile.length - 1);
    played.push(cardPile[randomIndex]);
    cardPile.splice(randomIndex, 1);
    this.setState(
      {
        played,
        cardPile,
        cardIndexToShow: cardIndexToShow + 1
      },
      () => this.saveAsMostRecent()
    );
  };

  saveAsMostRecent = () => StorageService.saveMostRecentGame('most-recent-game', this.state);

  seePreviousCard = () =>
    this.setState((prevState) => ({
      cardIndexToShow: prevState.cardIndexToShow - 1
    }));

  seeCurrentCard = () =>
    this.setState((prevState) => ({
      cardIndexToShow: prevState.played.length - 1
    }));

  render() {
    const { played, cardIndexToShow, cardPile } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={[styles.section, gameStyles.cardTextSection]}>
          <AppText>{played[cardIndexToShow]}</AppText>
        </View>
        <View style={[styles.section, gameStyles.cardButtonsSection]}>
          <View style={styles.buttonsRow}>
            <AppButton title="<" onPress={() => this.seePreviousCard()} disabled={cardIndexToShow === 0} />
            <AppButton title=">" onPress={() => this.playNextCard()} disabled={cardPile.length === 0} />
          </View>
          <View style={[gameStyles.mostRecentButtonRow]}>
            {cardIndexToShow < played.length - 1 && (
              <AppButton title="Most recent" onPress={() => this.seeCurrentCard()} />
            )}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default GameScreen;
