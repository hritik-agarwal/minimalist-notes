import {View, Text, TextInput, TouchableOpacity, Modal} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './NoteScreen.css';
import notes from '../../containers/Notes/tempData';
import {hp} from '../../utils/dimension';
import Button from '../../components/Button/Button';

const NoteScreen = props => {
  // state variables
  const {navigation, route} = props;
  const {id} = route.params;
  const [noteData, setNoteData] = useState(
    id != -1
      ? notes[notes.findIndex(item => item.id === id)]
      : {title: '', content: ''},
  );
  const [currentId, setCurrentId] = useState(id);
  const [currentTitle, setCurrentTitle] = useState(noteData.title);
  const [currentContent, setCurrentContent] = useState(noteData.content);
  const [isThereChanges, setIsThereChanges] = useState(false);
  const [showSaveAndClosePopup, setShowSaveAndClosePopup] = useState(false);
  const [showConfirmDeletePopup, setShowConfirmDeletePopup] = useState(false);

  // Utility Functions
  const handleTitleChange = text => setCurrentTitle(text);
  const handleContentChange = text => setCurrentContent(text);
  const goBack = () => navigation.goBack();

  // Function to save changes / save a new note
  const saveChanges = () => {
    const index = notes.findIndex(item => item.id === currentId);
    const currLen = notes.length;
    const newNote = {
      id: index === -1 ? currLen + 1 : currentId,
      title: currentTitle,
      content: currentContent,
    };
    if (index === -1) {
      notes.push(newNote);
      setCurrentId(currLen + 1);
    } else {
      notes[index] = newNote;
    }
    setNoteData(newNote);
  };

  // Function to delete a note
  const deleteNote = () => {
    const index = notes.findIndex(item => item.id === currentId);
    if (index !== -1) notes.splice(index, 1);
    goBack();
  };

  // Function triggered when clicked on save changes in save/discard changes modal
  const saveChangesModal = () => {
    saveChanges();
    goBack();
  };

  // Function triggered when clicked on back button
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

  // Function to update state of save button based on if there is any changes
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
      {/* Header Buttons - back, save, delete */}
      <View style={styles.headerButtons}>
        <Button title="Back" onPress={goBackHandler} />
        <Button title="Save" onPress={saveChanges} disabled={!isThereChanges} />
        {currentId !== -1 && (
          <Button
            title="Delete"
            styleContainer={{backgroundColor: 'red'}}
            onPress={() => setShowConfirmDeletePopup(true)}
          />
        )}
      </View>

      {/* Title Text Input */}
      <TextInput
        style={styles.title}
        placeholder="Title"
        value={currentTitle}
        onChangeText={handleTitleChange}
      />

      {/* Text/Note decoration options */}
      <View style={styles.optionButtonsContainer}>
        <Button
          styleContainer={{backgroundColor: 'white', height: hp(40)}}
          styleText={{color: 'black'}}
          title="A"
        />
        <Button
          styleContainer={{backgroundColor: 'white', height: hp(40)}}
          styleText={{color: 'black'}}
          title="A"
        />
        <Button
          styleContainer={{backgroundColor: 'white', height: hp(40)}}
          styleText={{color: 'black'}}
          title="A"
        />
        <Button
          styleContainer={{backgroundColor: 'white', height: hp(40)}}
          styleText={{color: 'black'}}
          title="A"
        />
        <Button
          styleContainer={{backgroundColor: 'white', height: hp(40)}}
          styleText={{color: 'black'}}
          title="A"
        />
      </View>

      {/* Content Text Input */}
      <TextInput
        style={styles.content}
        placeholder="Type your thoughts here..."
        textAlignVertical="top"
        multiline
        value={currentContent}
        onChangeText={handleContentChange}
      />

      {/* Save / Discard Changes Modal */}
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

      {/* Confirm Delete Modal */}
      <Modal
        visible={showConfirmDeletePopup}
        onRequestClose={() => setShowConfirmDeletePopup(false)}
        transparent={true}
        animationType="fade">
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={() => setShowConfirmDeletePopup(false)}
        />
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Confirm Delete?</Text>
          <Button title="Yes" onPress={deleteNote} />
          <Button title="No" onPress={() => setShowConfirmDeletePopup(false)} />
        </View>
      </Modal>
    </View>
  );
};

export default NoteScreen;
