import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import Todo from '../../components/Todo/Todo';
import {styles} from './Todos.css';

const Todos = props => {
  const {todos} = props;
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollview}>
        {todos &&
          todos.map((item, index) => {
            return (
              <View key={index}>
                <Todo completed={item.completed} title={item.title} />
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default Todos;
