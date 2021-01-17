import * as React from 'react';
import { View, SafeAreaView } from 'react-native';
import styles from '../../styles/styles';
import AppText from '../common/AppText';
import AppButton from '../common/AppButton';
import StorageService from '../../services/storageService';
import uuid from 'uuid';

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
    deckCards: [],
    cardIndexToShow: -1,
    gameId: uuid.v1()
  });

  setupGame = async () => {
    const { route, navigation } = this.props;
    navigation.setParams({ newGame: false });
    console.log('setup');
    const deck = await StorageService.getDeck(route.params.deckId);
    this.setState({ ...this.getInitialState(), deckCards: deck.cards }, this.playNewCard);
  };

  // min and max included as possible outcomes
  randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  getRandomCard = () => {
    const { deckCards } = this.state;
    const randomNum = this.randomIntFromInterval(0, deck.length - 1);
    return deckCards[randomNum];
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
    const { played, deckCards, cardIndexToShow } = this.state;
    const randomIndex = this.randomIntFromInterval(0, deckCards.length - 1);
    played.push(deckCards[randomIndex]);
    deckCards.splice(randomIndex, 1);
    this.setState(
      {
        played,
        deckCards,
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
    const { played, cardIndexToShow, deckCards } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.section}>
          <AppText>{played[cardIndexToShow]}</AppText>
        </View>
        <View style={[styles.section, styles.buttonsRow]}>
          {cardIndexToShow > 0 && <AppButton title="<" onPress={() => this.seePreviousCard()} styles={styles.button} />}
          {cardIndexToShow < played.length - 1 && (
            <AppButton title="Most recent" onPress={() => this.seeCurrentCard()} style={styles.button} />
          )}
          {deckCards.length > 0 && <AppButton title=">" onPress={() => this.playNextCard()} style={styles.button} />}
        </View>
      </SafeAreaView>
    );
  }
}

export default GameScreen;
