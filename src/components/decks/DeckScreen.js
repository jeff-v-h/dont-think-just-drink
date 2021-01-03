import * as React from 'react';
import { View, SafeAreaView, FlatList } from 'react-native';
import styles from '../../styles/styles';
import deckStyles from '../../styles/deckStyles';
import ListLinkRow from '../common/ListLinkRow';
import FloatingActionButton from '../common/FloatingActionButton';
import StorageService from '../../services/storageService';

class DeckScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      deck: { cards: [] }
    };
  }

  componentDidMount() {
    this.loadDeck();
  }

  componentDidUpdate() {
    const { navigation, route } = this.props;
    if (route.params.reloadDeck) {
      this.loadDeck();
      navigation.setParams({ reloadDeck: false });
    }
  }

  loadDeck = async () => {
    const { deckId } = this.props.route.params;
    const deck = await StorageService.getDeck(deckId);
    this.setState({ deck });
  };

  getNavigationToCardFunction = (cardText, cardIndex) => () => this.navigateToCard(cardText, cardIndex);

  navigateToCard = (cardText, cardIndex) =>
    this.props.navigation.navigate('ConfigureCards', {
      deckId: this.state.deck.id,
      cardIndex,
      cardText
    });

  render() {
    const { deck } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.list}>
          <FlatList
            data={deck.cards}
            renderItem={({ item, index }) => (
              <ListLinkRow
                onPress={this.getNavigationToCardFunction(item, index)}
                text={item}
                numberOfLines={2}
                otherStyles={[deckStyles.listRow]}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <FloatingActionButton
          onPress={() => this.navigateToCard()}
          buttonStyles={[styles.floatingActionButton]}
          iconStyles={[styles.floatingActionIcon]}
        />
      </SafeAreaView>
    );
  }
}

export default DeckScreen;
