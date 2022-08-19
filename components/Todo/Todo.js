import {View, Text} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import React, {useState} from 'react';
import {styles} from './Todo.css';

const Todo = props => {
  const {title, completed} = props;
  const [toggleCheckBox, setToggleCheckBox] = useState(completed);
  return (
    <View style={styles.container}>
      <CheckBox
        value={toggleCheckBox}
        onValueChange={newValue => setToggleCheckBox(newValue)}
      />
      <Text
        style={[
          styles.title,
          toggleCheckBox && {
            textDecorationLine: 'line-through',
            color: 'grey',
            fontWeight: '100',
          },
        ]}>
        {title}
      </Text>
    </View>
  );
};

export default Todo;
