import * as React from 'react';
import { View, SafeAreaView, FlatList } from 'react-native';
import styles from '../../styles/styles';
import gameStyles from '../../styles/gameStyles';
import ListLinkRow from '../common/ListLinkRow';
import standardDeck from '../../utils/decks/standard-deck';
import asianDeck from '../../utils/decks/asian-deck';

class DeckListScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      decks: [standardDeck, asianDeck],
      currentDeck: standardDeck.name
    };
  }

  // componentDidMount() {
  //   this.loadCustomDecks();
  // }

  navigateToDeck = (deck) => () => {
    console.log(deck);
  };

  render() {
    const { decks } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={[styles.section, gameStyles.cardButtons]}>
          <FlatList
            data={decks}
            renderItem={({ item }) => <ListLinkRow onPress={this.navigateToDeck(item)} text={item.name} />}
            keyExtractor={(item) => item.name}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default DeckListScreen;
