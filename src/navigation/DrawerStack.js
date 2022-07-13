import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/homeScreen';

const DrawerNavigation = createDrawerNavigator();

export default function DrawerStack() {
  return (
    <DrawerNavigation.Navigator>
      <DrawerNavigation.Screen name={'homeScreen'} component={HomeScreen} />
    </DrawerNavigation.Navigator>
  );
}
