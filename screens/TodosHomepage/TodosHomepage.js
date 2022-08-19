import React, {useEffect, useState, useRef} from 'react';
import {View, Text, Modal, TouchableOpacity, TextInput} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import Button from '../../components/Button/Button';
import {styles} from './TodosHomepage.css';
import EmptyPage from '../../components/EmptyPage/EmptyPage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Todos from './../../containers/Todos/Todos';
import tempData from './../../containers/Todos/tempData';

const TODOS_KEY = 'todos';

const TodosHomepage = props => {
  // const [todos, setTodos] = useState(tempData);
  const [showAddTodoModal, setShowAddTodoModal] = useState(false);
  const [newTodo, setNewTodo] = useState('');
  const [refresh, setRefresh] = useState(false);
  let todos = tempData;
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

  const addNewTodo = text => setNewTodo(text);
  const deleteTodo = index => {
    todos.splice(index, 1);
    setRefresh(refresh => !refresh);
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
        <Todos todos={todos} deleteTodo={deleteTodo} />
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
            onChangeText={addNewTodo}
            autoFocus={true}
            style={{borderWidth: 1}}></TextInput>
          <Button
            title="Add"
            onPress={() => {
              todos.push({title: newTodo, completed: false});
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
