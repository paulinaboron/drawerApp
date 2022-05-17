import * as React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

import S1 from "./components/S1"
import S2 from "./components/S2"

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Notatki" component={S1} />
        <Drawer.Screen name="Dodaj notatkę" component={S2} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;

