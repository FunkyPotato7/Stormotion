/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Routes} from './routes';
import {Home} from './screens/Home';
import {Game} from './screens/Game';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Routes.Home}
        screenOptions={{
          headerStyle: {
            backgroundColor: 'pink',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name={Routes.Home}
          component={Home}
          options={{title: ''}}
        />
        <Stack.Screen
          name={Routes.Game}
          component={Game}
          options={{title: 'Pick the Matches'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
