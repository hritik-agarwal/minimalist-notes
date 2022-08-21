import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import React, {useState} from 'react';
import {styles} from './Habit.css';
import {wp} from '../../utils/dimension';
import {useNavigation} from '@react-navigation/native';

const Habit = props => {
  const navigation = useNavigation();
  const {id, title, datesMarked, deleteHabit, saveHabit} = props;

  const getTodayDate = () => {
    return new Date().toLocaleDateString();
  };

  return (
    <View style={styles.container}>
      <View style={{width: '10%'}}>
        <CheckBox
          style={{width: 20, height: 20, borderRadius: 10}}
          value={datesMarked.includes(getTodayDate())}
          onValueChange={newValue => {
            let newDatesMarked = datesMarked;
            if (newValue) newDatesMarked.push(getTodayDate());
            else
              newDatesMarked.slice(newDatesMarked.indexOf(getTodayDate()), 1);
            saveHabit(id, title, newDatesMarked);
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('HabitScreen', {
            id,
            title,
            datesMarked,
          })
        }>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() => deleteHabit(id)}>
        <Text
          style={{
            fontSize: 15,
            width: wp('10%'),
            textAlign: 'center',
          }}>
          X
        </Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default Habit;
