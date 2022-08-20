import React, {useEffect, useState, useRef} from 'react';
import {View, Text, Modal, TouchableOpacity, TextInput} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import Button from '../../components/Button/Button';
import {styles} from './TodosHomepage.css';
import EmptyPage from '../../components/EmptyPage/EmptyPage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Todos from './../../containers/Todos/Todos';
import uuid from 'react-native-uuid';

const TODOS_KEY = 'todos';

const TodosHomepage = props => {
  const [todos, setTodos] = useState([]);
  const [showAddTodoModal, setShowAddTodoModal] = useState(false);
  const [newTodo, setNewTodo] = useState('');
  const [refresh, setRefresh] = useState(false);
  const isFocused = useIsFocused();

  // Function to get data from async-storage
  const getTodos = async () => {
    try {
      let todos = await AsyncStorage.getItem(TODOS_KEY);
      if (!todos) {
        updateTodos([]);
        return getTodos();
      }
      return JSON.parse(todos);
    } catch (e) {
      return e;
    }
  };

  // Function to update data to async-storage
  const updateTodos = async newdata => {
    try {
      await AsyncStorage.setItem(TODOS_KEY, JSON.stringify(newdata));
    } catch (e) {
      return e;
    }
  };

  useEffect(() => {
    if (isFocused) {
      getTodos()
        .then(todos => {
          setTodos(todos);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, [isFocused]);

  const saveTodo = (todoId, todoTitle, todoCompleted) => {
    getTodos()
      .then(todos => {
        const index = todos.findIndex(item => item.id === todoId);
        const currLen = todos.length;
        const todo = {
          id: todoId,
          title: todoTitle,
          completed: todoCompleted,
        };
        if (index === -1) {
          todos.push(todo);
        } else {
          todos[index] = todo;
        }
        setTodos(todos);
        updateTodos(todos);
      })
      .catch(error => console.log(error));
  };

  // Function to delete a todo
  const deleteTodo = todoId => {
    getTodos()
      .then(todos => {
        const index = todos.findIndex(item => item.id === todoId);
        if (index !== -1) todos.splice(index, 1);
        updateTodos(todos);
        setTodos(todos);
      })
      .catch(error => console.log(error));
  };

  const closeAddTodoModal = () => {
    setNewTodo('');
    setShowAddTodoModal(false);
  };

  return (
    <View style={styles.container}>
      {!todos || todos.length === 0 ? (
        <View style={styles.emptyPage}>
          <EmptyPage title="It's empty in here! :) " />
        </View>
      ) : (
        <Todos todos={todos} deleteTodo={deleteTodo} saveTodo={saveTodo} />
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
          onPress={() => {
            setShowAddTodoModal(true);
          }}
        />
      </View>
      <Modal
        visible={showAddTodoModal}
        onRequestClose={closeAddTodoModal}
        transparent={true}
        animationType="fade">
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={closeAddTodoModal}
        />
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Add New Todo</Text>
          <TextInput
            value={newTodo}
            onChangeText={text => setNewTodo(text)}
            autoFocus={true}
            style={{borderWidth: 1}}></TextInput>
          <Button
            title="Add"
            onPress={() => {
              if (newTodo === '') {
                alert("Todo can't be empty");
                return;
              }
              saveTodo(uuid.v4(), newTodo, false);
              closeAddTodoModal();
            }}
          />
          <Button title="Discard" onPress={closeAddTodoModal} />
        </View>
      </Modal>
    </View>
  );
};

export default TodosHomepage;
