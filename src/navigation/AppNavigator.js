import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../components/decks/HomeScreen';
import RulesScreen from '../components/rules/RulesScreen';
import GameScreen from '../components/game/GameScreen';
import DeckListScreen from '../components/decks/DeckListScreen';
import DeckScreen from '../components/decks/DeckScreen';
import ConfigureCardsScreen from '../components/decks/ConfigureCardsScreen';
import { HeaderBackButton } from '@react-navigation/stack';
import HeaderDeleteDeckButton from '../components/decks/HeaderDeleteDeckButton';
import HeaderDeleteCardButton from '../components/decks/HeaderDeleteCardButton';

const Drawer = createDrawerNavigator();
const DecksConfigStack = createStackNavigator();
const GameStack = createStackNavigator();
const RulesStack = createStackNavigator();

const DecksConfigNavigationStack = () => (
  <DecksConfigStack.Navigator initialRouteName="Home">
    <DecksConfigStack.Screen name="Home" component={HomeScreen} />
    <DecksConfigStack.Screen
      name="DeckList"
      component={DeckListScreen}
      options={({ navigation, route }) => ({
        title: 'Decks',
        headerLeft: (props) => (
          <HeaderBackButton
            {...props}
            onPress={() =>
              navigation.navigate('Home', {
                reloadSelection: route.params.reloadSelection,
                selectedDeckId: route.params.selectedDeckId,
                selectedDeckName: route.params.selectedDeckName
              })
            }
          />
        )
      })}
    />
    <DecksConfigStack.Screen
      name="Deck"
      component={DeckScreen}
      options={({ navigation, route }) => ({
        headerLeft: (props) => (
          <HeaderBackButton
            {...props}
            onPress={() =>
              navigation.navigate('DeckList', {
                reloadDeckList: route.params.reloadDeckList
              })
            }
          />
        ),
        headerRight: () => <HeaderDeleteDeckButton deckId={route.params.deckId} navigate={navigation.navigate} />
      })}
    />
    <DecksConfigStack.Screen
      name="ConfigureCards"
      component={ConfigureCardsScreen}
      options={({ navigation, route }) => ({
        title: 'Configure Card',
        headerLeft: (props) => (
          <HeaderBackButton
            {...props}
            onPress={() =>
              navigation.navigate('Deck', {
                reloadDeck: route.params.reloadDeck
              })
            }
          />
        ),
        headerRight: () => {
          const { deckId, cardIndex, cards } = route.params;
          return cardIndex < cards.length ? (
            <HeaderDeleteCardButton deckId={deckId} cardIndex={cardIndex} navigate={navigation.navigate} />
          ) : null;
        }
      })}
    />
  </DecksConfigStack.Navigator>
);

const GamesNavigationStack = () => (
  <GameStack.Navigator initialRouteName="Game" options={{ title: "Don't Think, Just Drink" }}>
    <GameStack.Screen name="Game" component={GameScreen} />
  </GameStack.Navigator>
);

const RulesNavigationStack = () => (
  <RulesStack.Navigator initialRouteName="Rules">
    <RulesStack.Screen name="Rules" component={RulesScreen} options={{ title: 'The Rules' }} />
  </RulesStack.Navigator>
);

function AppNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerPosition="right" drawerType="slide">
        <Drawer.Screen name="Decks" component={DecksConfigNavigationStack} />
        <Drawer.Screen name="Game" component={GamesNavigationStack} />
        <Drawer.Screen name="Rules" component={RulesNavigationStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
