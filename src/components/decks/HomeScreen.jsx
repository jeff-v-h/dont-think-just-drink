import * as React from 'react';
import { View, SafeAreaView, Alert, Text, Modal } from 'react-native';
import styles from '../../styles/styles';
import HeaderText from '../common/HeaderText';
import AppButton from '../common/AppButton';
import StorageService from '../../services/storageService';
import standardDeck from '../../utils/decks/standard-deck';
import asianDeck from '../../utils/decks/asian-deck';
import { ERROR_TITLE, DISCLAIMER } from '../../utils/constants';
import deckStyles from '../../styles/deckStyles';

class HomeScreen extends React.Component {
  state = {
    selectedDeckId: '',
    selectedDeckName: '',
    disclaimerVisible: false
  };

  componentDidMount() {
    this.onStartRequests();
  }

  componentDidUpdate() {
    const { route, navigation } = this.props;
    if (route.params?.reloadSelection) {
      const { selectedDeckId, selectedDeckName } = route.params;
      navigation.setParams({ reloadSelection: false });
      this.setState({ selectedDeckId, selectedDeckName });
    }
  }

  onStartRequests = async () => {
    // await StorageService.clearAllData();
    this.loadSelectedDeck();
    this.checkDisclaimer();
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

  checkDisclaimer = async () => {
    if (!await StorageService.checkSeenDisclaimer()) {
      this.setState({ disclaimerVisible: true });
    }
  }

  setDisclaimerVisible = disclaimerVisible => this.setState({ disclaimerVisible });

  saveSeenDisclaimer = async () => {
    this.setDisclaimerVisible(false);
    await StorageService.saveSeenDisclaimer();
  }

  render() {
    const { selectedDeckId, selectedDeckName, disclaimerVisible } = this.state;
    const { navigation } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.section}>
          <HeaderText>Don't Think</HeaderText>
          <HeaderText>Just Drink</HeaderText>
        </View>
        <View style={deckStyles.selectDeckView}>
          <Text style={styles.text}>Deck:</Text>
          <AppButton
            title={selectedDeckName}
            onPress={this.goToDeckSelection}
            style={deckStyles.selectDeckButton}
            textStyle={deckStyles.selectDeckText}
            numberOfLines={1}
          />
        </View>
        <View style={styles.section}>
          <AppButton
            title="Start Game"
            onPress={() =>
              navigation.navigate('Game', {
                screen: 'Game',
                params: { deckId: selectedDeckId, deckName: selectedDeckName, newGame: true }
              })
            }
            disabled={!selectedDeckId}
            style={styles.button}
          />
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={disclaimerVisible}
          onRequestClose={() => this.setDisclaimerVisible(false)}
        >
          <View style={styles.bottomPopupModal}>
            <View style={styles.bottomPopupContent}>
              <Text style={styles.bold}>Disclaimer</Text>
              <Text>{DISCLAIMER}</Text>
              <View style={styles.rightButtonsView}>
                <AppButton
                  title="Okay"
                  onPress={this.saveSeenDisclaimer}
                  style={styles.modalButton}
                  textStyle={styles.modalButtonText}
                />
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

export default HomeScreen;
