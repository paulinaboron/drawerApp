import * as React from 'react';
import { Image, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

import S1 from "./components/S1"
import S2 from "./components/S2"
import NewCategory from './components/NewCategory'
import EditNote from './components/EditNote';

function CustomDrawerContent(props) {



  return (
    <DrawerContentScrollView {...props}>

      <DrawerItemList {...props} />

      <DrawerItem
        label="Info"
        icon={() => <Image />}
        onPress={() => infoAlert()}
      />


    </DrawerContentScrollView>
  );
}

function infoAlert() {
  Alert.alert(
    "Paulina Boroń",
    "3P",
    [
      {
        text: "OK",
        style: "cancel"
      },
    ]
  );
}

function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Notatki" component={S1} />
        <Drawer.Screen name="Dodaj notatkę" component={S2} />
        <Drawer.Screen name="Dodaj kategorię" component={NewCategory} />
        <Drawer.Screen
          name="Edytowanie"
          component={EditNote}
          options={{
            drawerItemStyle: { height: 0 }
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const MyTheme = {
  dark: true,
  colors: {
    primary: 'rgb(80, 80, 90)',
    background: 'rgb(24, 24, 34)',
    card: 'rgb(25, 25, 35)',
    text: 'rgb(222, 222, 222)',
    border: 'rgb(25, 25, 35)',
    notification: 'rgb(255, 69, 58)',
  },
};

export default App;

