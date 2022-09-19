import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles} from './ExpenseScreen.css';
import Button from '../../components/Button/Button';
import {hp, wp} from '../../utils/dimension';
import DatePicker from 'react-native-date-picker';
import EmptyPage from '../../components/EmptyPage/EmptyPage';

const ExpenseScreen = props => {
  const {id, category, expenseData, saveExpense} = props.route.params;
  const earliestExpense = expenseData.length > 0 ? expenseData[0].date : null;
  const latestExpense =
    expenseData.length > 0 ? expenseData[expenseData.length - 1].date : null;
  const [data, setData] = useState(expenseData);
  const [openFromDate, setOpenFromDate] = useState(false);
  const [openToDate, setOpenToDate] = useState(false);
  const [fromDate, setFromDate] = useState(new Date(earliestExpense));
  const [toDate, setToDate] = useState(new Date(latestExpense));

  useEffect(() => {
    if (fromDate > toDate) {
      alert(
        'From date can not be after To date. Reverting to start and end of current month!',
      );
      setFromDate(new Date(now.getFullYear(), now.getMonth(), 1));
      setToDate(new Date(now.getFullYear(), now.getMonth() + 1, 0));
    }

    if (new Date(fromDate) < new Date(earliestExpense)) {
      alert('From date can not be before earliest expense!');
      setFromDate(new Date(earliestExpense));
    }

    if (new Date(toDate) > new Date(latestExpense)) {
      alert('To date can not be after latest expense!');
      setToDate(new Date(latestExpense));
    }
  }, [fromDate, toDate]);

  const formatDate = date => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
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
      <Text style={styles.category}>{category}</Text>
      {expenseData.length === 0 ? (
        <View style={styles.emptyPage}>
          <EmptyPage title={`Go spend some money on ${category}! :) `} />
        </View>
      ) : (
        <>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => setOpenFromDate(true)}>
              <View
                style={{
                  height: hp(50),
                  justifyContent: 'center',
                  borderWidth: 1,
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
                  borderWidth: 1,
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
          <ScrollView>
            {data &&
              data.map((item, index) => {
                const date = new Date(item.date);
                return (
                  <View key={item.id}>
                    <View style={styles.expenseItem}>
                      <View
                        style={{
                          width: wp('100%'),
                          borderRightWidth: 1,
                        }}>
                        <View style={styles.itemHeadingContainer}>
                          <Text style={styles.itemHeadingValue}>
                            {item.title}{' '}
                          </Text>
                          <Text style={styles.itemHeadingValue}>
                            Rs. {item.amount}
                          </Text>
                        </View>
                        <View style={styles.itemHeadingContainer}>
                          <Text style={styles.itemHeadingValue}>
                            {item.method}
                          </Text>
                          <Text style={styles.itemHeadingValue}>
                            {date.toDateString()}
                          </Text>
                          <Button
                            title={
                              <Image
                                style={{
                                  width: wp(20),
                                  height: wp(20),
                                  borderWidth: 1,
                                }}
                                source={require('./../../src/images/icons/delete.png')}
                              />
                            }
                            styleContainer={{backgroundColor: 'transparent'}}
                            styleText={{color: 'black'}}
                            onPress={() => {
                              const newExpenseData = expenseData.filter(
                                expense => expense.id !== item.id,
                              );
                              saveExpense(id, category, newExpenseData);
                              setData(newExpenseData);
                            }}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })}
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default ExpenseScreen;
