import {View, Text, TextInput, TouchableOpacity, Modal} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './NoteScreen.css';
import notes from '../../containers/Notes/tempData';
import {hp} from '../../utils/dimension';
import Button from '../../components/Button/Button';

const NoteScreen = props => {
  const {navigation, route} = props;
  const {id} = route.params;
  const [noteData, setNoteData] = useState(
    notes[notes.findIndex(item => item.id === id)],
  );
  const [currentTitle, setCurrentTitle] = useState(noteData.title);
  const [currentContent, setCurrentContent] = useState(noteData.content);
  const [showSaveAndClosePopup, setShowSaveAndClosePopup] = useState(false);
  const [isThereChanges, setIsThereChanges] = useState(false);

  const handleTitleChange = text => setCurrentTitle(text);
  const handleContentChange = text => setCurrentContent(text);
  const goBack = () => navigation.goBack();
  const saveChanges = () => {
    let index = notes.findIndex(item => item.id === id);
    notes[index] = {id, title: currentTitle, content: currentContent};
    setNoteData(notes[index]);
  };
  const saveChangesModal = () => {
    saveChanges();
    goBack();
  };
  const goBackHandler = () => {
    if (
      noteData.title !== currentTitle ||
      noteData.content !== currentContent
    ) {
      setShowSaveAndClosePopup(true);
    } else {
      goBack();
    }
  };

  useEffect(() => {
    if (
      noteData.title !== currentTitle ||
      noteData.content !== currentContent
    ) {
      setIsThereChanges(true);
    } else setIsThereChanges(false);
  }, [currentTitle, currentContent, noteData]);

  return (
    <View style={styles.container}>
      <View style={styles.headerButtons}>
        <Button title="Go Back" onPress={goBackHandler} />
        <Button
          title="Save Changes"
          onPress={saveChanges}
          disabled={!isThereChanges}
        />
      </View>
      <TextInput
        style={styles.title}
        placeholder="Title"
        value={currentTitle}
        onChangeText={handleTitleChange}
      />
      <TextInput
        style={styles.content}
        placeholder="Type your thoughts here..."
        textAlignVertical="top"
        multiline
        value={currentContent}
        onChangeText={handleContentChange}
      />
      <Modal
        visible={showSaveAndClosePopup}
        onRequestClose={() => setShowSaveAndClosePopup(false)}
        transparent={true}
        animationType="fade">
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={() => setShowSaveAndClosePopup(false)}
        />
        <View style={styles.modalView}>
          <Text style={styles.modalText}>You have unsaved changes!</Text>
          <Button title="Save Changes" onPress={saveChangesModal} />
          <Button title="Discard Changes" onPress={goBack} />
        </View>
      </Modal>
    </View>
  );
};

export default NoteScreen;
