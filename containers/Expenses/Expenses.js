import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Expense from '../../components/Expense/Expense';
import {styles} from './Expenses.css';
import DatePicker from 'react-native-date-picker';
import Button from '../../components/Button/Button';
import {hp, wp} from '../../utils/dimension';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Expenses = props => {
  const now = new Date();
  const isFocused = useIsFocused();
  const {expenses, deleteExpense, saveExpense} = props;
  const [expenseBudget, setExpenseBudget] = useState(20000);
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [openFromDate, setOpenFromDate] = useState(false);
  const [openToDate, setOpenToDate] = useState(false);
  const [editBudget, setEditBudget] = useState(false);
  const [fromDate, setFromDate] = useState(
    new Date(now.getFullYear(), now.getMonth(), 1),
  );
  const [toDate, setToDate] = useState(
    new Date(now.getFullYear(), now.getMonth() + 1, 0),
  );

  useEffect(() => {
    if (fromDate > toDate) {
      alert(
        'From date can not be after To date. Reverting to start and end of current month!',
      );
      setFromDate(new Date(now.getFullYear(), now.getMonth(), 1));
      setToDate(new Date(now.getFullYear(), now.getMonth() + 1, 0));
    }
  }, [fromDate, toDate]);

  const formatDate = date => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const checkDate = () => {
    if (
      new Date(fromDate).toLocaleDateString() ===
        new Date(now.getFullYear(), now.getMonth(), 1).toLocaleDateString() &&
      new Date(toDate).toLocaleDateString() ===
        new Date(now.getFullYear(), now.getMonth() + 1, 0).toLocaleDateString()
    ) {
      return true;
    }
    return false;
  };

  const updateExpenseBudget = async newdata => {
    try {
      await AsyncStorage.setItem('expenseBudget', JSON.stringify(newdata));
    } catch (e) {
      return e;
    }
  };

  const getExpenseBudget = async () => {
    try {
      let budget = await AsyncStorage.getItem('expenseBudget');
      if (!budget) {
        updateExpenseBudget({});
        return getExpenseBudget();
      }
      return JSON.parse(budget);
    } catch (e) {
      return e;
    }
  };

  const saveExpenseBudget = (expensebudget, expenseamount) => {
    const budget = {
      expenseBudget: expensebudget,
      expenseAmount: expenseamount,
    };
    updateExpenseBudget(budget);
  };

  useEffect(() => {
    if (isFocused) {
      getExpenseBudget()
        .then(budget => {
          setExpenseAmount(budget.expenseAmount);
          setExpenseBudget(budget.expenseBudget);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => setOpenFromDate(true)}>
          <View
            style={{
              height: hp(50),
              justifyContent: 'center',
              width: wp('50%'),
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 20, color: 'black'}}>
              From: {formatDate(fromDate)}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setOpenToDate(true)}>
          <View
            style={{
              height: hp(50),
              justifyContent: 'center',
              width: wp('50%'),
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 20, color: 'black'}}>
              To: {formatDate(toDate)}
            </Text>
          </View>
        </TouchableOpacity>
        <DatePicker
          modal
          mode="date"
          open={openFromDate}
          date={fromDate}
          onConfirm={date => {
            setOpenFromDate(false);
            setFromDate(date);
          }}
          onCancel={() => {
            setOpenFromDate(false);
          }}
        />
        <DatePicker
          modal
          mode="date"
          open={openToDate}
          date={toDate}
          onConfirm={date => {
            setOpenToDate(false);
            setToDate(date);
          }}
          onCancel={() => {
            setOpenToDate(false);
          }}
        />
      </View>
      {checkDate() === true && (
        <View style={styles.budgetExpenseContainer}>
          <View>
            <View style={styles.budgetExpenseItemContainer}>
              <Text style={styles.budgetExpenseItemText}>
                Total Expense Budget:
              </Text>
              {editBudget ? (
                <View>
                  <TextInput
                    style={{
                      borderBottomWidth: 1,
                      width: wp('20%'),
                      padding: 0,
                      color: 'black',
                    }}
                    value={expenseBudget}
                    onChangeText={text => setExpenseBudget(text)}
                    onBlur={() => {
                      setEditBudget(false);
                      saveExpenseBudget(expenseBudget, expenseAmount);
                    }}
                  />
                </View>
              ) : (
                <TouchableOpacity onLongPress={() => setEditBudget(true)}>
                  <Text style={styles.budgetExpenseItemText}>
                    Rs. {expenseBudget}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.budgetExpenseItemContainer}>
              <Text style={styles.budgetExpenseItemText}>
                Total Expense Amount:
              </Text>
              <Text style={styles.budgetExpenseItemText}>
                Rs. {expenseAmount}
              </Text>
            </View>
            <View style={styles.budgetExpenseItemContainer}>
              <Text style={styles.budgetExpenseItemText}>
                Total Budget Remaining:
              </Text>
              <Text style={styles.budgetExpenseItemText}>
                Rs. {expenseBudget - expenseAmount}
              </Text>
            </View>
          </View>
        </View>
      )}

      {checkDate() === false && (
        <Text style={{color: 'grey', marginBottom: hp(20)}}>
          Note: Set date range to current month to use budgeting.
        </Text>
      )}
      <ScrollView>
        {expenses &&
          expenses.map((item, index) => {
            return (
              <View key={item.id}>
                <Expense
                  id={item.id}
                  category={item.category}
                  expenseData={item.expenseData}
                  deleteExpense={deleteExpense}
                  saveExpense={saveExpense}
                  fromDate={fromDate}
                  toDate={toDate}
                  expenseBudget={expenseBudget}
                  expenseAmount={expenseAmount}
                  setExpenseBudget={setExpenseBudget}
                  setExpenseAmount={setExpenseAmount}
                  saveExpenseBudget={saveExpenseBudget}
                />
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default Expenses;
