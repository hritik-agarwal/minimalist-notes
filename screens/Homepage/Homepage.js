import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import Notes from '../../containers/Notes/Notes';
import Button from '../../components/Button/Button';
import {styles} from './Homepage.css';
import EmptyPage from '../../components/EmptyPage/EmptyPage';
import notes from '../../containers/Notes/tempData';

const Homepage = props => {
  const {navigation} = props;

  // Rerender the page whenever homepage is in focus
  const [refresh, setRefresh] = useState(true);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      setRefresh(!refresh);
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
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
