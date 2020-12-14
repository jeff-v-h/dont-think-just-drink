import * as React from 'react';
import { View, SafeAreaView } from 'react-native';
import styles from '../../styles/styles';
import AppText from '../common/AppText';
import AppButton from '../common/AppButton';
import { cardContentList } from '../../utils/card-content';

class GameScreen extends React.Component {
  state = {
    played: [],
    deck: cardContentList
  };

  componentDidMount() {
    this.playCard();
  }

  // min and max included as possible outcomes
  randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  getRandomCard = () => {
    const { deck } = this.state;
    const randomNum = this.randomIntFromInterval(0, deck.length - 1);
    return deck[randomNum];
  };

  playCard = () => {
    const { played, deck } = this.state;
    const randomIndex = this.randomIntFromInterval(0, deck.length - 1);
    played.push(deck[randomIndex]);
    deck.splice(randomIndex, 1);
    this.setState({ played, deck });
  };

  render() {
    const { navigation } = this.props;
    const { played } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.section}>
          <AppText>{played[played.length - 1]}</AppText>
        </View>
        <View style={styles.section}>
          <AppButton title="Next" onPress={() => this.playCard()} style={styles.button} />
        </View>
      </SafeAreaView>
    );
  }
}

export default GameScreen;
