import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import Button from '../../components/Button/Button';
import {styles} from './TodosHomepage.css';
import EmptyPage from '../../components/EmptyPage/EmptyPage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Todos from './../../containers/Todos/Todos';

const TODOS_KEY = 'todos';

const TodosHomepage = props => {
  const [todos, setTodos] = useState([
    {title: 'Todo1', completed: false},
    {title: 'Todo2', completed: true},
  ]);
  const isFocused = useIsFocused();

  // // Function to get data from async-storage
  // const getTodos = async () => {
  //   try {
  //     const todosdata = await AsyncStorage.getItem(TODOS_KEY);
  //     return JSON.parse(todosdata);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // useEffect(() => {
  //   if (isFocused) {
  //     getTodos().then(todos => {
  //       setTodos(todos);
  //     });
  //   }
  // }, [isFocused]);

  return (
    <View style={styles.container}>
      {!todos || todos.length === 0 ? (
        <View style={styles.emptyPage}>
          <EmptyPage title="It's empty in here! :) " />
        </View>
      ) : (
        <Todos todos={todos} />
      )}
      <View style={styles.createNewTodoButton}>
        <Button
          title="+"
          styleContainer={{
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: 'grey',
          }}
          styleText={{fontSize: 25, color: 'white'}}
        />
      </View>
    </View>
  );
};

export default TodosHomepage;
