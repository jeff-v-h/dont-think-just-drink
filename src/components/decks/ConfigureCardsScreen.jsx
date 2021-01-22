import * as React from 'react';
import { ScrollView, View, TextInput, Animated, Easing, Alert } from 'react-native';
import StorageService from '../../services/storageService';
import AppButton from '../common/AppButton';
import styles from '../../styles/styles';
import deckStyles from '../../styles/deckStyles';
import LottieView from 'lottie-react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { ERROR_TITLE } from '../../utils/constants';
import IconButton from '../common/IconButton';

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
    const nextCardIndex = cardIndex + 1;
    this.props.navigation.navigate('ConfigureCards', {
      cardIndex: nextCardIndex,
      cardText: nextCardIndex < cards.length ? cards[cardIndex + 1] : '',
      reloadCard: true
    });
  };

  resetCardText = () =>
    this.setState((prevState) => ({
      cardText: prevState.originalCardText
    }));

  saveCard = async () => {
    try {
      const { deckId, cardIndex, cardText, cards } = this.state;

      if (cardIndex === cards.length) {
        await StorageService.saveNewCard(deckId, cardText);
        cards.push(cardText);
      } else {
        await StorageService.saveCard(deckId, cardText, cardIndex);
      }

      this.setState({ originalCardText: cardText, cards });
      this.animateSuccess();
      this.props.navigation.setParams({ reloadDeck: true, cardIndex, cards });
    } catch (e) {
      Alert.alert(ERROR_TITLE, e.message);
    }
  };

  deleteCard = async () => {
    const { deckId, cardIndex } = this.state;
    await StorageService.deleteCard(deckId, cardIndex);
    this.props.navigation.navigate('Deck', { reloadDeck: true });
  }

  animateSuccess = () =>
    Animated.timing(this.state.tickProgress, {
      toValue: 1.5,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: true
    }).start(this.resetSuccessAnimation);

  resetSuccessAnimation = () =>
    Animated.timing(this.state.tickProgress, {
      toValue: 0,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true
    }).start();

  _onHandlerStateChange = (event) => {
    // Only call functions once the user has finished swiping right or left a certain amount
    if (event.nativeEvent.state === State.END) {
      const { translationX } = event.nativeEvent;
      const { cardIndex, cards } = this.state;

      if (translationX > 50 && cardIndex !== 0) {
        this.goPreviousCard();
        return;
      }
      if (translationX < -50 && cardIndex !== cards.length) {
        this.goNextCard();
        return;
      }
    }
  };

  render() {
    const { cardIndex, cardText, originalCardText, cards } = this.state;

    return (
      <PanGestureHandler onHandlerStateChange={this._onHandlerStateChange}>
        <ScrollView style={styles.scrollContainer}>
          <LottieView source={require('../../../assets/5449-success-tick.json')} progress={this.state.tickProgress} />
          <View style={styles.topButtonsRow}>
            {cardIndex < cards.length && (
              <IconButton onPress={this.deleteCard} iconName="trash-o" size={30} opacity={0.5} />
            )}
          </View>
          <TextInput
            style={deckStyles.configCardInput}
            onChangeText={this.onChangeText}
            value={cardText}
            placeholder="If ____, drink ___ sips"
            multiline={true}
          />
          <View style={[styles.buttonsRow, deckStyles.configButtonsRow]}>
            <AppButton title="<" onPress={this.goPreviousCard} disabled={cardIndex === 0} />
            <AppButton title=">" onPress={this.goNextCard} disabled={cardIndex === cards.length} />
          </View>
          <View style={[styles.buttonsRow, deckStyles.configButtonsRow]}>
            <AppButton title="Reset" onPress={this.resetCardText} disabled={cardText === originalCardText} />
            <AppButton title="Save" onPress={this.saveCard} />
          </View>
        </ScrollView>
      </PanGestureHandler>
    );
  }
}

export default ConfigureCardsScreen;
