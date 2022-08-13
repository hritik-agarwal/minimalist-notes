import {View, Text} from 'react-native';
import React from 'react';
import Notes from '../../containers/Notes/Notes';
import Button from '../../components/Button/Button';
import {styles} from './Homepage.css';
import EmptyPage from '../../components/EmptyPage/EmptyPage';
import notes from '../../containers/Notes/tempData';

const Homepage = () => {
  return (
    <View style={styles.container}>
      {notes.length == 0 ? (
        <View style={styles.emptyPage}>
          <EmptyPage title="It's empty in here! :) " />
        </View>
      ) : (
        <Notes />
      )}
      <View style={styles.createNewNoteButton}>
        <Button title="Create New Note" />
      </View>
    </View>
  );
};

export default Homepage;
