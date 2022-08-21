import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import React, {useState} from 'react';
import {styles} from './Todo.css';
import {wp} from '../../utils/dimension';

const Todo = props => {
  const {id, title, completed, deleteTodo, saveTodo} = props;
  const [newTitle, setNewTitle] = useState(title);

  return (
    <View style={styles.container}>
      <View style={{width: '10%'}}>
        <CheckBox
          value={completed}
          onValueChange={newValue => {
            saveTodo(id, title, newValue);
          }}
        />
      </View>
      <TouchableOpacity>
        <TextInput
          multiline
          value={newTitle}
          onChangeText={text => setNewTitle(text)}
          onBlur={() => {
            if (title !== newTitle) {
              saveTodo(id, newTitle, completed);
            }
          }}
          style={[
            styles.title,
            (completed && {
              textDecorationLine: 'line-through',
              color: 'grey',
              fontWeight: '100',
            }: null),
          ]}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteTodo(id)}>
        <Text
          style={{
            fontSize: 15,
            width: wp('10%'),
            textAlign: 'center',
          }}>
          X
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Todo;
