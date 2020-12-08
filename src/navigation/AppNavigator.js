import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../components/home/HomeScreen';
import RulesScreen from '../components/home/RulesScreen';
import CardScreen from '../components/game/CardScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Don't Think, Just Drink" }} />
        <Stack.Screen name="Rules" component={RulesScreen} options={{ title: 'The Rules' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
