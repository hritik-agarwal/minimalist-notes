import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import Notes from '../../containers/Notes/Notes';
import Button from '../../components/Button/Button';
import {styles} from './Homepage.css';
import EmptyPage from '../../components/EmptyPage/EmptyPage';
import {wp, hp} from '../../utils/dimension';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTES_KEY = 'notes';

const Homepage = props => {
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
      <View style={styles.header}>
        <Button
          styleContainer={{backgroundColor: 'transparent', height: hp(40)}}
          styleText={{color: 'black'}}
          title={
            <Image
              style={{width: wp(20), height: wp(20)}}
              source={require('./../../src/images/icons/menu.png')}
            />
          }
        />
        <Text
          style={{
            width: wp('80%'),
            textAlign: 'center',
            fontSize: 20,
            color: 'brown',
            fontWeight: '300',
            letterSpacing: 1,
          }}>
          Minimalist Note
        </Text>
      </View>
      {notes.length === 0 ? (
        <View style={styles.emptyPage}>
          <EmptyPage title="It's empty in here! :) " />
        </View>
      ) : (
        <Notes notes={notes} />
      )}
      <View style={styles.createNewNoteButton}>
        <Button
          title="Create New Note"
          onPress={() => navigation.navigate('NoteScreen', {id: -1})}
        />
      </View>
    </View>
  );
};

export default Homepage;
