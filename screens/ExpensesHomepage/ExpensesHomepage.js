import React, {useEffect, useState, useRef} from 'react';
import {View, Text, Modal, TouchableOpacity, TextInput} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import Button from '../../components/Button/Button';
import {styles} from './ExpensesHomepage.css';
import EmptyPage from '../../components/EmptyPage/EmptyPage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Expenses from './../../containers/Expenses/Expenses';
import uuid from 'react-native-uuid';

const EXPENSES_KEY = 'expenses';

const ExpensesHomepage = props => {
  const [expenses, setExpenses] = useState([]);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [newExpense, setNewExpense] = useState('');
  const [refresh, setRefresh] = useState(false);
  const isFocused = useIsFocused();

  // Function to get data from async-storage
  const getExpenses = async () => {
    try {
      let expenses = await AsyncStorage.getItem(EXPENSES_KEY);
      if (!expenses) {
        updateExpenses([]);
        return getExpenses();
      }
      return JSON.parse(expenses);
    } catch (e) {
      return e;
    }
  };

  // Function to update data to async-storage
  const updateExpenses = async newdata => {
    try {
      await AsyncStorage.setItem(EXPENSES_KEY, JSON.stringify(newdata));
    } catch (e) {
      return e;
    }
  };

  useEffect(() => {
    if (isFocused) {
      getExpenses()
        .then(expenses => {
          setExpenses(expenses);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, [isFocused]);

  const saveExpense = (expenseId, expenseCategory, expenseData) => {
    getExpenses()
      .then(expenses => {
        const index = expenses.findIndex(item => item.id === expenseId);
        const expense = {
          id: expenseId,
          category: expenseCategory,
          expenseData: expenseData,
        };
        if (index === -1) {
          expenses.push(expense);
        } else {
          expenses[index] = expense;
        }
        setExpenses(expenses);
        updateExpenses(expenses);
        setRefresh(!refresh);
      })
      .catch(error => console.log(error));
  };

  // Function to delete a expense
  const deleteExpense = expenseId => {
    getExpenses()
      .then(expenses => {
        const index = expenses.findIndex(item => item.id === expenseId);
        if (index !== -1) expenses.splice(index, 1);
        updateExpenses(expenses);
        setExpenses(expenses);
      })
      .catch(error => console.log(error));
  };

  const closeAddExpenseModal = () => {
    setNewExpense('');
    setShowAddExpenseModal(false);
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 20,
          color: '#0099ff',
          padding: 10,
          borderBottomWidth: 1,
        }}>
        Minimalist Productivity
      </Text>
      {!expenses || expenses.length === 0 ? (
        <View style={styles.emptyPage}>
          <EmptyPage title="It's empty in here! :) " />
        </View>
      ) : (
        <Expenses
          expenses={expenses}
          deleteExpense={deleteExpense}
          saveExpense={saveExpense}
        />
      )}
      <View style={styles.createNewExpenseButton}>
        <Button
          title="+"
          styleContainer={{
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: '#0099ff',
          }}
          styleText={{fontSize: 25, color: 'white'}}
          onPress={() => {
            setShowAddExpenseModal(true);
          }}
        />
      </View>
      <Modal
        visible={showAddExpenseModal}
        onRequestClose={closeAddExpenseModal}
        transparent={true}
        animationType="fade">
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={closeAddExpenseModal}
        />
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Add New Expense Category</Text>
          <TextInput
            multiline
            value={newExpense}
            onChangeText={text => setNewExpense(text)}
            autoFocus={true}
            style={{borderWidth: 1, color: 'black'}}></TextInput>
          <Button
            title="Add"
            onPress={() => {
              if (newExpense === '') {
                alert("Expense can't be empty");
                return;
              }
              saveExpense(uuid.v4(), newExpense, []);
              closeAddExpenseModal();
            }}
          />
          <Button title="Discard" onPress={closeAddExpenseModal} />
        </View>
      </Modal>
    </View>
  );
};

export default ExpensesHomepage;
