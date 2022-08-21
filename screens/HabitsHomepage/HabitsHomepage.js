import React, {useEffect, useState, useRef} from 'react';
import {View, Text, Modal, TouchableOpacity, TextInput} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import Button from '../../components/Button/Button';
import {styles} from './HabitsHomepage.css';
import EmptyPage from '../../components/EmptyPage/EmptyPage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Habits from './../../containers/Habits/Habits';
import uuid from 'react-native-uuid';

const HABITS_KEY = 'habits';

const HabitsHomepage = props => {
  const [habits, setHabits] = useState([]);
  const [showAddHabitModal, setShowAddHabitModal] = useState(false);
  const [newHabit, setNewHabit] = useState('');
  const [refresh, setRefresh] = useState(false);
  const isFocused = useIsFocused();

  // Function to get data from async-storage
  const getHabits = async () => {
    try {
      let habits = await AsyncStorage.getItem(HABITS_KEY);
      if (!habits) {
        updateHabits([]);
        return getHabits();
      }
      return JSON.parse(habits);
    } catch (e) {
      return e;
    }
  };

  // Function to update data to async-storage
  const updateHabits = async newdata => {
    try {
      await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(newdata));
    } catch (e) {
      return e;
    }
  };

  useEffect(() => {
    if (isFocused) {
      getHabits()
        .then(habits => {
          setHabits(habits);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, [isFocused]);

  const saveHabit = (habitId, habitTitle, habitDatesMarked) => {
    getHabits()
      .then(habits => {
        const index = habits.findIndex(item => item.id === habitId);
        const habit = {
          id: habitId,
          title: habitTitle,
          datesMarked: habitDatesMarked,
        };
        if (index === -1) {
          habits.push(habit);
        } else {
          habits[index] = habit;
        }
        setHabits(habits);
        updateHabits(habits);
      })
      .catch(error => console.log(error));
  };

  // Function to delete a habit
  const deleteHabit = habitId => {
    getHabits()
      .then(habits => {
        const index = habits.findIndex(item => item.id === habitId);
        if (index !== -1) habits.splice(index, 1);
        updateHabits(habits);
        setHabits(habits);
      })
      .catch(error => console.log(error));
  };

  const closeAddHabitModal = () => {
    setNewHabit('');
    setShowAddHabitModal(false);
  };

  return (
    <View style={styles.container}>
      {!habits || habits.length === 0 ? (
        <View style={styles.emptyPage}>
          <EmptyPage title="It's empty in here! :) " />
        </View>
      ) : (
        <Habits
          habits={habits}
          deleteHabit={deleteHabit}
          saveHabit={saveHabit}
        />
      )}
      <View style={styles.createNewHabitButton}>
        <Button
          title="+"
          styleContainer={{
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: 'grey',
          }}
          styleText={{fontSize: 25, color: 'white'}}
          onPress={() => {
            setShowAddHabitModal(true);
          }}
        />
      </View>
      <Modal
        visible={showAddHabitModal}
        onRequestClose={closeAddHabitModal}
        transparent={true}
        animationType="fade">
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={closeAddHabitModal}
        />
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Add New Habit</Text>
          <TextInput
            multiline
            value={newHabit}
            onChangeText={text => setNewHabit(text)}
            autoFocus={true}
            style={{borderWidth: 1}}></TextInput>
          <Button
            title="Add"
            onPress={() => {
              if (newHabit === '') {
                alert("Habit can't be empty");
                return;
              }
              saveHabit(uuid.v4(), newHabit, []);
              closeAddHabitModal();
            }}
          />
          <Button title="Discard" onPress={closeAddHabitModal} />
        </View>
      </Modal>
    </View>
  );
};

export default HabitsHomepage;
