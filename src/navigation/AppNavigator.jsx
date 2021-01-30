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
import ContactUsScreen from '../components/contact-us/ContactUsScreen';
import HeaderMenuButton from '../components/common/HeaderMenuButton';
import DisclaimerScreen from '../components/legal/DisclaimerScreen';

const Drawer = createDrawerNavigator();
const DecksConfigStack = createStackNavigator();
const GameStack = createStackNavigator();
const RulesStack = createStackNavigator();
const ContactStack = createStackNavigator();
const LegalStack = createStackNavigator();

const DecksConfigNavigationStack = () => (
  <DecksConfigStack.Navigator initialRouteName="Home">
    <DecksConfigStack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerRight: () => <HeaderMenuButton />
      }}
    />
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
        ),
        headerRight: () => <HeaderMenuButton />
      })}
    />
    <DecksConfigStack.Screen
      name="Deck"
      component={DeckScreen}
      options={({ navigation, route }) => ({
        headerLeft: (props) => (
          <HeaderBackButton {...props} onPress={() => navigation.navigate('DeckList', { reloadDeckList: true })} />
        ),
        headerRight: () => <HeaderMenuButton />
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
        headerRight: () => <HeaderMenuButton />
      })}
    />
  </DecksConfigStack.Navigator>
);

const GamesNavigationStack = () => (
  <GameStack.Navigator initialRouteName="Game" options={{ title: "Don't Think, Just Drink" }}>
    <GameStack.Screen
      name="Game"
      component={GameScreen}
      options={({ route }) => ({
        title: 'Deck: ' + (route.params?.deckName ?? ''),
        headerRight: () => <HeaderMenuButton />
      })}
    />
  </GameStack.Navigator>
);

const RulesNavigationStack = () => (
  <RulesStack.Navigator initialRouteName="Rules">
    <RulesStack.Screen
      name="Rules"
      component={RulesScreen}
      options={{
        title: 'The Rules',
        headerRight: () => <HeaderMenuButton />
      }}
    />
  </RulesStack.Navigator>
);

const ContactNavigationStack = () => (
  <ContactStack.Navigator initialRouteName="Contact">
    <ContactStack.Screen
      name="Contact"
      component={ContactUsScreen}
      options={{
        title: 'Contact Us',
        headerRight: () => <HeaderMenuButton />
      }}
    />
  </ContactStack.Navigator>
)

const LegalNavigationStack = () => (
  <LegalStack.Navigator initialRouteName="Disclaimer">
    <LegalStack.Screen
      name="Disclaimer"
      component={DisclaimerScreen}
      options={{
        title: "Legal/Disclaimer",
        headerRight: () => <HeaderMenuButton />
      }}
    />
  </LegalStack.Navigator>
)

function AppNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerPosition="right" drawerType="slide">
        <Drawer.Screen name="Decks" component={DecksConfigNavigationStack} />
        <Drawer.Screen name="Game" component={GamesNavigationStack} />
        <Drawer.Screen name="Rules" component={RulesNavigationStack} />
        <Drawer.Screen name="Contact Us" component={ContactNavigationStack} />
        <Drawer.Screen name="Legal/Disclaimer" component={LegalNavigationStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
