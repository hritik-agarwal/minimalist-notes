import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {styles} from './Note.css';

const Note = props => {
  const {id, title, content} = props;
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate('NoteScreen', {id, title, content});
      }}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Note;
