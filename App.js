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
import {StyleSheet, Text, Image, View, LogBox} from 'react-native';
import NoteScreen from './screens/NoteScreen/NoteScreen';
import ExpenseScreen from './screens/ExpenseScreen/ExpenseScreen';
import NotesHomepage from './screens/NotesHomepage/NotesHomepage';
import TodosHomepage from './screens/TodosHomepage/TodosHomepage';
import HabitsHomepage from './screens/HabitsHomepage/HabitsHomepage';
import ExpensesHomepage from './screens/ExpensesHomepage/ExpensesHomepage';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

LogBox.ignoreAllLogs(true);
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const CalendarHomepage = () => <Text>Calendar</Text>;

export const icons = {
  Notes: {
    uri: require('./src/images/icons/notes.png'),
  },
  Todos: {
    uri: require('./src/images/icons/todos.png'),
  },
  Habits: {
    uri: require('./src/images/icons/habits.png'),
  },
  Calendar: {
    uri: require('./src/images/icons/calendar.png'),
  },
  Expenses: {
    uri: require('./src/images/icons/expenses.png'),
  },
};

const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        lazy: false,
        tabBarLabelStyle: {
          fontWeight: '700',
          fontSize: 15,
        },
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          return (
            <Image
              source={icons[`${route.name}`].uri}
              style={{
                width: size / 1.2,
                height: size / 1.2,
                textAlign: 'center',
                opacity: focused ? 1 : 0.5,
              }}
            />
          );
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        options={{style: {borderWidth: 1}}}
        name="Notes"
        component={NotesHomepage}
      />
      <Tab.Screen name="Todos" component={TodosHomepage} />
      <Tab.Screen name="Habits" component={HabitsHomepage} />
      <Tab.Screen name="Expenses" component={ExpensesHomepage} />
      {/* <Tab.Screen name="Calendar" component={CalendarHomepage} /> */}
    </Tab.Navigator>
  );
};

const App: () => Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="NoteScreen"
          component={NoteScreen}
          options={{animation: 'none'}}
        />
        <Stack.Screen
          name="ExpenseScreen"
          component={ExpenseScreen}
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
