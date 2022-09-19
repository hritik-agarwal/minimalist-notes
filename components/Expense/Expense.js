import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import React, {useEffect, useState} from 'react';
import {styles} from './Expense.css';
import {hp, wp} from '../../utils/dimension';
import {useNavigation} from '@react-navigation/native';
import Button from '../../components/Button/Button';
import {useIsFocused} from '@react-navigation/native';
import uuid from 'react-native-uuid';

const Expense = props => {
  const navigation = useNavigation();
  const {
    id,
    category,
    expenseData,
    deleteExpense,
    saveExpense,
    fromDate,
    toDate,
    expenseBudget,
    expenseAmount,
    setExpenseBudget,
    setExpenseAmount,
    saveExpenseBudget,
  } = props;
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('bank');
  const [newCategory, setNewTitle] = useState(category);
  const [editMode, setEditMode] = useState(false);
  const [showConfirmDeletePopup, setShowConfirmDeletePopup] = useState(false);
  const [showNewExpensePopup, setShowNewExpensePopup] = useState(false);
  const [totalExpense, setTotalExpense] = useState(0);

  const getTodayDate = () => {
    return new Date().toLocaleDateString();
  };

  const clearState = () => {
    setTitle('');
    setAmount('');
    setMethod('bank');
    setShowNewExpensePopup(false);
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) return;
    let amountspent = 0;
    expenseData.forEach(item => {
      const from = new Date(fromDate);
      const curr = new Date(item.date);
      const to = new Date(toDate);
      if (curr >= from && curr <= to) {
        amountspent += item.amount;
      }
    });
    setTotalExpense(amountspent);
  }, [isFocused, fromDate, toDate]);

  const findMonthExpense = () => {
    let amountspent = 0;
    const now = new Date();
    expenseData.forEach(item => {
      const from = new Date(now.getFullYear(), now.getMonth(), 1);
      const curr = new Date(item.date);
      const to = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      if (curr >= from && curr <= to) {
        amountspent += item.amount;
      }
    });
    return amountspent;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ExpenseScreen', {
            id,
            category,
            expenseData,
            saveExpense,
            expenseBudget,
            expenseAmount,
            saveExpenseBudget,
          });
        }}
        onLongPress={() => setEditMode(true)}>
        {editMode === true ? (
          <TextInput
            maxLength={50}
            autoFocus={true}
            style={[styles.category]}
            value={newCategory}
            onChangeText={text => setNewTitle(text)}
          />
        ) : (
          <Text style={styles.category}>{category}</Text>
        )}
      </TouchableOpacity>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {editMode === true ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Button
              title={
                <Image
                  style={{width: wp(20), height: wp(20)}}
                  source={require('./../../src/images/icons/delete.png')}
                />
              }
              styleContainer={{backgroundColor: 'transparent'}}
              styleText={{color: 'black', marginTop: -10}}
              onPress={() => setShowConfirmDeletePopup(true)}
            />
            <Button
              title="Save"
              styleContainer={{backgroundColor: 'transparent'}}
              styleText={{color: 'black', fontSize: 18, paddingLeft: 0}}
              onPress={() => {
                if (category !== newCategory)
                  saveExpense(id, newCategory, expenseData);
                setEditMode(false);
              }}
            />
          </View>
        ) : (
          <View>
            <Text style={styles.amount}>Rs. {totalExpense}</Text>
          </View>
        )}
      </View>
      <Button
        title="+"
        styleContainer={{
          backgroundColor: 'transparent',
          width: wp('10%'),
          borderLeftWidth: 1,
          backgroundColor: 'grey',
        }}
        styleText={{color: 'white'}}
        onPress={() => setShowNewExpensePopup(true)}
      />
      <Modal
        visible={showConfirmDeletePopup}
        onRequestClose={() => setShowConfirmDeletePopup(false)}
        transparent={true}
        animationType="fade">
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={() => setShowConfirmDeletePopup(false)}
        />
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Confirm Delete?</Text>
          <Button
            title="Yes"
            onPress={() => {
              const monthExpense = findMonthExpense();
              saveExpenseBudget(expenseBudget, expenseAmount - monthExpense);
              deleteExpense(id);
            }}
          />
          <Button title="No" onPress={() => setShowConfirmDeletePopup(false)} />
        </View>
      </Modal>
      <Modal
        visible={showNewExpensePopup}
        onRequestClose={clearState}
        transparent={true}
        animationType="fade">
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={clearState}
        />
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Add new expense</Text>
          <View style={styles.modalItemContainer}>
            <Text style={styles.modalItemTitle}>Title:</Text>
            <TextInput
              value={title}
              style={styles.modalItemInput}
              onChangeText={text => setTitle(text)}
              placeholder="Where?"
              autoFocus={true}
            />
          </View>
          <View style={styles.modalItemContainer}>
            <Text style={styles.modalItemTitle}>Amount:</Text>
            <TextInput
              value={amount}
              keyboardType="numeric"
              style={styles.modalItemInput}
              onChangeText={text => setAmount(text)}
              placeholder="How much?"
            />
          </View>
          <View style={styles.modalItemContainer}>
            <Text style={styles.modalItemTitle}>Method:</Text>
            <TextInput
              value={method}
              style={styles.modalItemInput}
              onChangeText={text => setMethod(text)}
              placeholder="cash/bank?"
            />
          </View>
          <View style={styles.modalItemButtonContainer}>
            <Button
              title="Add"
              onPress={() => {
                if (title === '' || amount === '') {
                  alert('Please add correct details!');
                  return;
                }
                const values = amount.split(',');
                let total = 0;
                values.forEach(i => {
                  if (i.length) total += parseInt(i);
                });
                saveExpense(id, newCategory, [
                  ...expenseData,
                  {
                    id: uuid.v4(),
                    title: title,
                    amount: total,
                    method: method === '' ? 'cash' : method,
                    date: new Date(),
                  },
                ]);
                clearState();
                setTotalExpense(prev => parseInt(prev) + parseInt(total));
                const curr = expenseAmount;
                saveExpenseBudget(expenseBudget, curr + total);
                setExpenseAmount(curr + total);
              }}
              styleContainer={styles.modalItemButton}
            />
            <Button
              title="Cancel"
              onPress={() => {
                setShowNewExpensePopup(false);
                clearState();
              }}
              styleContainer={styles.modalItemButton}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Expense;
