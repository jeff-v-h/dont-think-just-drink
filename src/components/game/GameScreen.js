import * as React from 'react';
import { View, SafeAreaView } from 'react-native';
import styles from '../../styles/styles';
import AppText from '../common/AppText';
import AppButton from '../common/AppButton';
import { cardContentList } from '../../utils/card-content';

class GameScreen extends React.Component {
  state = {
    played: [],
    deck: [...cardContentList],
    cardIndexToShow: -1
  };

  componentDidMount() {
    this.playNewCard();
  }

  // min and max included as possible outcomes
  randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  getRandomCard = () => {
    const { deck } = this.state;
    const randomNum = this.randomIntFromInterval(0, deck.length - 1);
    return deck[randomNum];
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
    const { played, deck, cardIndexToShow } = this.state;
    const randomIndex = this.randomIntFromInterval(0, deck.length - 1);
    played.push(deck[randomIndex]);
    deck.splice(randomIndex, 1);
    this.setState({ played, deck, cardIndexToShow: cardIndexToShow + 1 });
  };

  seePreviousCard = () =>
    this.setState((prevState) => ({
      cardIndexToShow: prevState.cardIndexToShow - 1
    }));

  seeCurrentCard = () =>
    this.setState((prevState) => ({
      cardIndexToShow: prevState.played.length - 1
    }));

  render() {
    const { navigation } = this.props;
    const { played, cardIndexToShow, deck } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.section}>
          <AppText>{played[cardIndexToShow]}</AppText>
        </View>
        <View style={styles.section}>
          {deck.length > 0 && <AppButton title="Next" onPress={() => this.playNextCard()} style={styles.button} />}
          {cardIndexToShow < played.length - 1 && (
            <AppButton title="Back to most recent" onPress={() => this.seeCurrentCard()} style={styles.button} />
          )}
          {cardIndexToShow > 0 && (
            <AppButton title="Previous" onPress={() => this.seePreviousCard()} style={styles.button} />
          )}
        </View>
      </SafeAreaView>
    );
  }
}

export default GameScreen;
