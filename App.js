import * as React from 'react';
import { NavigationContainer  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import GetMap from './views/GetMap'
import Friends from './views/Friends'
import Home from './views/Home'
import GetMovie from './views/GetMovie'
import GetMusic from './views/GetMusic'
import GetFood from './views/GetFood'





const Stack = createStackNavigator();


export default function App() {
  console.disableYellowBox = true;
  return (
    <NavigationContainer >
      <Stack.Navigator >
        <Stack.Screen name="Home" component={Home}  options={{headerShown: false}}/>
        <Stack.Screen name="Map" component={GetMap} options={{headerShown: false}} />
        <Stack.Screen name="Friends" component={Friends} options={{headerShown: false}}/>
        <Stack.Screen name="Movie" component={GetMovie} options={{headerShown: false}} />
        <Stack.Screen name="Music" component={GetMusic} options={{headerShown: false}} />
        <Stack.Screen name="Food" component={GetFood} options={{headerShown: false}} />
        

      </Stack.Navigator>
    </NavigationContainer>
  );
}

