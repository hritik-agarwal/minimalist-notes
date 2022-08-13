/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Homepage from './screens/Homepage/Homepage';
import NoteScreen from './screens/NoteScreen/NoteScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App: () => Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Homepage"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Homepage" component={Homepage} />
        <Stack.Screen
          name="NoteScreen"
          component={NoteScreen}
          options={{animation: 'none'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;
