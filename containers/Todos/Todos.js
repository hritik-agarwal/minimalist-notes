import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import Todo from '../../components/Todo/Todo';
import {styles} from './Todos.css';

const Todos = props => {
  const {todos, deleteTodo} = props;
  return (
    <View style={styles.container}>
      <ScrollView>
        {todos &&
          todos.map((item, index) => {
            return (
              <View key={index}>
                <Todo
                  id={index}
                  title={item.title}
                  completed={item.completed}
                  deleteTodo={deleteTodo}
                />
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default Todos;
