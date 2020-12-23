import * as React from 'react';
import { View, SafeAreaView, FlatList } from 'react-native';
import styles from '../../styles/styles';
import deckStyles from '../../styles/deckStyles';
import ListLinkRow from '../common/ListLinkRow';
import standardDeck from '../../utils/decks/standard-deck';
import asianDeck from '../../utils/decks/asian-deck';

class DeckScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      deck: props.route.params.deckId === asianDeck.id ? asianDeck : standardDeck
    };
  }

  // componentDidMount() {
  //   this.loadCustomDecks();
  // }

  navigateToCard = (card) => () => {
    // this.props.navigation.navigate('ConfigureCards', {
    //   cardId: card.id
    // })
    console.log(card);
  };

  render() {
    const { deck } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.list}>
          <FlatList
            data={deck.cards}
            renderItem={({ item }) => (
              <ListLinkRow onPress={this.navigateToCard(item)} text={item} otherStyles={[deckStyles.listRow]} />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default DeckScreen;
