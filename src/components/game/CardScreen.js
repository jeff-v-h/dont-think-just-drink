import * as React from 'react';
import { View, SafeAreaView } from 'react-native';
import styles from '../../styles/styles';
import AppText from '../common/AppText';
import AppButton from '../common/AppButton';
import { cardContentList } from '../../utils/card-content';

class CardScreen extends React.Component {
  // min and max included as possible outcomes
  randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  getRandomCard = () => {
    const randomNum = this.randomIntFromInterval(0, cardContentList.length - 1);
    return cardContentList[randomNum];
  };

  render() {
    const { navigation } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.section}>
          <AppText>{this.getRandomCard()}</AppText>
        </View>
        <View style={styles.section}>
          <AppButton title="Next" onPress={() => navigation.push('Card')} style={styles.button} />
        </View>
      </SafeAreaView>
    );
  }
}

export default CardScreen;
