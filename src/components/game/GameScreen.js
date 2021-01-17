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
    this.state = {
      played: [],
      deckCards: [],
      cardIndexToShow: -1,
      gameId: uuid.v1()
    };
  }

  componentDidMount() {
    this.setupGame();
  }

  setupGame = async () => {
    const deck = await StorageService.getDeck(this.props.route.params.deckId);
    this.setState({ deckCards: deck.cards }, this.playNewCard);
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
          {cardIndexToShow > 0 && (
            <AppButton title="Previous" onPress={() => this.seePreviousCard()} styles={styles.button} />
          )}
          {cardIndexToShow < played.length - 1 && (
            <AppButton title="Back to most recent" onPress={() => this.seeCurrentCard()} style={styles.button} />
          )}
          {deckCards.length > 0 && <AppButton title="Next" onPress={() => this.playNextCard()} style={styles.button} />}
        </View>
      </SafeAreaView>
    );
  }
}

export default GameScreen;
