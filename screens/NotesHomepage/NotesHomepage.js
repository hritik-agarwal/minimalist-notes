import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import Notes from '../../containers/Notes/Notes';
import Button from '../../components/Button/Button';
import {styles} from './NotesHomepage.css';
import EmptyPage from '../../components/EmptyPage/EmptyPage';
import {wp, hp} from '../../utils/dimension';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTES_KEY = 'notes';

const NotesHomepage = props => {
  const [notes, setNotes] = useState([]);
  const {navigation} = props;
  const isFocused = useIsFocused();

  // Function to get data from async-storage
  const getNotes = async () => {
    try {
      const notesdata = await AsyncStorage.getItem(NOTES_KEY);
      return JSON.parse(notesdata);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getNotes().then(notes => {
        setNotes(notes);
      });
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 20,
          color: '#0099ff',
          padding: 10,
          borderBottomWidth: 1,
        }}>
        Minimalist Productivity
      </Text>
      {!notes || notes.length === 0 ? (
        <View style={styles.emptyPage}>
          <EmptyPage title="Your own personal diary! :) " />
        </View>
      ) : (
        <Notes notes={notes} />
      )}
      <View style={styles.createNewNoteButton}>
        <Button
          title="+"
          styleContainer={{
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: '#0099ff',
          }}
          styleText={{fontSize: 25, color: 'white'}}
          onPress={() => navigation.navigate('NoteScreen', {id: -1})}
        />
      </View>
    </View>
  );
};

export default NotesHomepage;
