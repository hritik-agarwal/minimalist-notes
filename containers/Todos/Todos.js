import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import Todo from '../../components/Todo/Todo';
import {styles} from './Todos.css';

const Todos = props => {
  const {todos, deleteTodo, saveTodo} = props;
  return (
    <View style={styles.container}>
      <ScrollView>
        {todos &&
          todos.map((item, index) => {
            return (
              <View key={item.id}>
                <Todo
                  id={item.id}
                  title={item.title}
                  completed={item.completed}
                  deleteTodo={deleteTodo}
                  saveTodo={saveTodo}
                />
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default Todos;
