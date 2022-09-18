import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import Expense from '../../components/Expense/Expense';
import {styles} from './Expenses.css';

const Expenses = props => {
  const {expenses, deleteExpense, saveExpense} = props;
  const [data, setDate] = useState(expenses);
  return (
    <View style={styles.container}>
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
                />
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default Expenses;
