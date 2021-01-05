import * as React from 'react';
import { View, TextInput, Animated, Easing } from 'react-native';
import StorageService from '../../services/storageService';
import AppButton from '../common/AppButton';
import styles from '../../styles/styles';
import deckStyles from '../../styles/deckStyles';
import LottieView from 'lottie-react-native';

class ConfigureCardsScreen extends React.Component {
  constructor(props) {
    super(props);

    const { deckId, cardIndex, cards } = props.route.params;
    const initialText = cards[cardIndex] ?? '';

    this.state = {
      deckId,
      cardIndex: cardIndex ?? cards.length,
      cardText: initialText,
      originalCardText: initialText,
      cards,
      tickProgress: new Animated.Value(0)
    };
  }

  componentDidUpdate() {
    const { navigation, route } = this.props;
    if (route.params.reloadCard) {
      this.refreshCard();
      navigation.setParams({ reloadCard: false });
    }
  }

  refreshCard = () => {
    const { deckId, cardIndex, cards } = this.props.route.params;
    const initialText = cards[cardIndex];

    this.setState({
      deckId,
      cardIndex,
      cardText: initialText,
      originalCardText: initialText
    });
  };

  onChangeText = (cardText) => this.setState({ cardText });

  goPreviousCard = () => {
    const { cards, cardIndex } = this.state;
    this.props.navigation.navigate('ConfigureCards', {
      cardIndex: cardIndex - 1,
      cardText: cards[cardIndex - 1],
      reloadCard: true
    });
  };

  goNextCard = () => {
    const { cards, cardIndex } = this.state;
    this.props.navigation.navigate('ConfigureCards', {
      cardIndex: cardIndex + 1,
      cardText: cards[cardIndex + 1],
      reloadCard: true
    });
  };

  saveCard = async () => {
    const { deckId, cardIndex, cardText } = this.state;
    await StorageService.saveCard(deckId, cardIndex, cardText);
    this.animateSuccess();
  };

  animateSuccess = () => {
    Animated.timing(this.state.tickProgress, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true
    }).start(this.resetSuccessAnimation);
  };

  resetSuccessAnimation = () => this.setState({ tickProgress: new Animated.Value(0) });

  render() {
    const { navigation } = this.props;
    const { cardIndex, cardText, cards } = this.state;

    return (
      <View style={[styles.container, deckStyles.configureCardsContainer]}>
        <LottieView source={require('../../../assets/5449-success-tick.json')} progress={this.state.tickProgress} />
        <View style={deckStyles.configCardView}>
          <TextInput
            style={deckStyles.configCardInput}
            onChangeText={this.onChangeText}
            value={cardText}
            placeholder="If ____, drink ___ sips"
            multiline={true}
          />
        </View>
        <View style={[styles.section, deckStyles.configCardButtons]}>
          <View style={[styles.buttonsRow]}>
            <AppButton title="<" onPress={this.goPreviousCard} disabled={cardIndex === 0} />
            <AppButton title=">" onPress={this.goNextCard} disabled={cardIndex === cards.length - 1} />
          </View>
          <View style={[styles.buttonsRow]}>
            <AppButton title="Cancel" onPress={navigation.goBack} />
            <AppButton title="Save" onPress={this.saveCard} />
          </View>
        </View>
      </View>
    );
  }
}

export default ConfigureCardsScreen;
