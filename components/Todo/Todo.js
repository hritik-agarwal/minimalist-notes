import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import React, {useState} from 'react';
import {styles} from './Todo.css';
import {wp} from '../../utils/dimension';

const Todo = props => {
  const {id, title, completed, deleteTodo} = props;
  const [toggleCheckBox, setToggleCheckBox] = useState(completed);

  return (
    <View style={styles.container}>
      <View style={{width: '10%'}}>
        <CheckBox
          value={toggleCheckBox}
          onValueChange={newValue => setToggleCheckBox(newValue)}
        />
      </View>
      <TouchableOpacity>
        <TextInput
          style={[
            styles.title,
            (toggleCheckBox && {
              textDecorationLine: 'line-through',
              color: 'grey',
              fontWeight: '100',
            }: null),
          ]}>
          {title}
        </TextInput>
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
