import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../components/game/HomeScreen';
import RulesScreen from '../components/rules/RulesScreen';
import GameScreen from '../components/game/GameScreen';
import DeckListScreen from '../components/decks/DeckListScreen';
import DeckScreen from '../components/decks/DeckScreen';
import ConfigureCardsScreen from '../components/decks/ConfigureCardsScreen';
import { HeaderBackButton } from '@react-navigation/stack';

const Drawer = createDrawerNavigator();
const GameStack = createStackNavigator();
const RulesStack = createStackNavigator();
const DecksStack = createStackNavigator();

const GamesNavigationStack = () => (
  <GameStack.Navigator initialRouteName="Home" options={{ title: "Don't Think, Just Drink" }}>
    <GameStack.Screen name="Home" component={HomeScreen} />
    <GameStack.Screen name="Game" component={GameScreen} />
  </GameStack.Navigator>
);

const RulesNavigationStack = () => (
  <RulesStack.Navigator initialRouteName="Rules">
    <RulesStack.Screen name="Rules" component={RulesScreen} options={{ title: 'The Rules' }} />
  </RulesStack.Navigator>
);

const DecksNavigationStack = () => (
  <DecksStack.Navigator initialRouteName="DeckList">
    <DecksStack.Screen name="DeckList" component={DeckListScreen} options={{ title: 'Decks' }} />
    <DecksStack.Screen
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
        )
      })}
    />
    <DecksStack.Screen
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
        )
      })}
    />
  </DecksStack.Navigator>
);

function AppNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerPosition="right" drawerType="slide">
        <Drawer.Screen name="Game" component={GamesNavigationStack} />
        <Drawer.Screen name="Rules" component={RulesNavigationStack} />
        <Drawer.Screen name="Decks" component={DecksNavigationStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
