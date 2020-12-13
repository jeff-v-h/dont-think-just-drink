import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../components/game/HomeScreen';
import RulesScreen from '../components/rules/RulesScreen';
import CardScreen from '../components/game/CardScreen';
import ConfigureCardsScreen from '../components/app-settings/ConfigureCardsScreen';

const Drawer = createDrawerNavigator();
const GameStack = createStackNavigator();
const RulesStack = createStackNavigator();
const SettingsStack = createStackNavigator();

const GamesNavigationStack = () => (
  <GameStack.Navigator initialRouteName="Home" options={{ title: "Don't Think, Just Drink" }}>
    <GameStack.Screen name="Home" component={HomeScreen} />
    <GameStack.Screen name="Game" component={CardScreen} />
  </GameStack.Navigator>
);

const RulesNavigationStack = () => (
  <RulesStack.Navigator initialRouteName="Rules">
    <RulesStack.Screen name="Rules" component={RulesScreen} options={{ title: 'The Rules' }} />
  </RulesStack.Navigator>
);

const SettingsNavigationStack = () => (
  <SettingsStack.Navigator initialRouteName="Configure">
    <SettingsStack.Screen name="Configure" component={ConfigureCardsScreen} options={{ title: 'Configuration' }} />
  </SettingsStack.Navigator>
);

function AppNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerPosition="right" drawerType="slide">
        <Drawer.Screen name="Game" component={GamesNavigationStack} />
        <Drawer.Screen name="Rules" component={RulesNavigationStack} />
        <Drawer.Screen name="Configuration" component={SettingsNavigationStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
