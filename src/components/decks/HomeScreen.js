import * as React from 'react';
import { View, SafeAreaView, Alert, Text } from 'react-native';
import styles from '../../styles/styles';
import HeaderText from '../common/HeaderText';
import AppButton from '../common/AppButton';
import { GameTypesEnum } from '../../utils/enums';
import StorageService from '../../services/storageService';
import standardDeck from '../../utils/decks/standard-deck';
import asianDeck from '../../utils/decks/asian-deck';
import { ERROR_TITLE } from '../../utils/constants';
import gameStyles from '../../styles/gameStyles';

class HomeScreen extends React.Component {
  state = {
    selectedDeckId: '',
    selectedDeckName: ''
  };

  componentDidMount() {
    this.loadSelectedDeck();
  }

  loadSelectedDeck = async () => {
    try {
      let selectedDeck = await StorageService.getSelectedDeck();

      if (!selectedDeck) {
        selectedDeck = standardDeck;
        await this.firstTimeSetup();
      }

      this.setState({ selectedDeckId: selectedDeck.id, selectedDeckName: selectedDeck.name });
    } catch (e) {
      Alert.alert(ERROR_TITLE, e.message);
    }
  };

  firstTimeSetup = async () => {
    try {
      const saveNewDecks = StorageService.saveNewDecks([standardDeck, asianDeck]);
      const saveSelectedDeckId = StorageService.saveSelectedDeckId(standardDeck.id);
      await Promise.all([saveNewDecks, saveSelectedDeckId]);
    } catch (e) {
      Alert.alert(ERROR_TITLE, e.message);
    }
  };

  goToDeckSelection = () => {
    const { selectedDeckId, selectedDeckName } = this.state;
    this.props.navigation.navigate('DeckList', { selectedDeckId, selectedDeckName });
  };

  render() {
    const { selectedDeckId, selectedDeckName } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.menuRow}>
          <AppButton title="Menu" onPress={() => this.props.navigation.toggleDrawer()} />
        </View>
        <View style={styles.section}>
          <HeaderText>Don't Think</HeaderText>
          <HeaderText>Just Drink</HeaderText>
        </View>
        <View style={gameStyles.selectDeckView}>
          <Text style={styles.text}>Deck:</Text>
          <AppButton
            title={selectedDeckName}
            onPress={this.goToDeckSelection}
            style={gameStyles.selectDeckButton}
            textStyle={gameStyles.selectDeckText}
          />
        </View>
        <View style={styles.section}>
          <AppButton
            title="Start Game"
            onPress={() =>
              navigation.navigate('Game', {
                gameType: GameTypesEnum.normal
              })
            }
            disabled={!selectedDeckId}
            style={styles.button}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default HomeScreen;