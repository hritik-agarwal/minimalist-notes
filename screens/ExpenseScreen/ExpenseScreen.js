import {View, Text} from 'react-native';
import React from 'react';
import {styles} from './ExpenseScreen.css';

const ExpenseScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={{color: 'black'}}>ExpenseScreen</Text>
    </View>
  );
};

export default ExpenseScreen;
