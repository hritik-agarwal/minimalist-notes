import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import Habit from '../../components/Habit/Habit';
import {styles} from './Habits.css';

const Habits = props => {
  const {habits, deleteHabit, saveHabit} = props;
  return (
    <View style={styles.container}>
      <ScrollView>
        {habits &&
          habits.map((item, index) => {
            return (
              <View key={item.id}>
                <Habit
                  id={item.id}
                  title={item.title}
                  datesMarked={item.datesMarked}
                  deleteHabit={deleteHabit}
                  saveHabit={saveHabit}
                />
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default Habits;
