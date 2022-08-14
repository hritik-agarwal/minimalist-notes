import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import Note from '../../components/Note/Note';
import {styles} from './Notes.css';

const Notes = props => {
  const {notes} = props;
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollview}>
        {notes &&
          notes.map((item, index) => {
            return (
              <View key={index}>
                <Note id={item.id} title={item.title} content={item.content} />
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default Notes;
