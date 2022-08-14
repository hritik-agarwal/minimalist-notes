import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Image,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {styles} from './NoteScreen.css';
import {hp, wp} from '../../utils/dimension';
import Button from '../../components/Button/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTES_KEY = 'notes';

const NoteScreen = props => {
  // param variables
  const {navigation, route} = props;
  const {id, title, content} = route.params;

  // state variables
  const isThereChanges = useRef(false);
  const [currentId, setCurrentId] = useState(id);
  const [noteData, setNoteData] = useState(
    id === -1 ? {title: '', content: ''} : {title, content},
  );
  const [currentTitle, setCurrentTitle] = useState(id === -1 ? '' : title);
  const [currentContent, setCurrentContent] = useState(
    id === -1 ? '' : content,
  );
  const [disableSaveButton, setDisableSaveButton] = useState(false);
  const [showSaveAndClosePopup, setShowSaveAndClosePopup] = useState(false);
  const [showConfirmDeletePopup, setShowConfirmDeletePopup] = useState(false);

  // Utility Functions
  const handleTitleChange = text => setCurrentTitle(text);
  const handleContentChange = text => setCurrentContent(text);
  const goBack = () => navigation.goBack();

  // Function to save changes / save a new note
  const saveChanges = () => {
    if (currentTitle === '') {
      alert('Title can not be empty');
      return -1;
    }
    getNotes()
      .then(notes => {
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
        updateNotes(notes);
      })
      .catch(error => console.log(error));
  };

  // Function to delete a note
  const deleteNote = () => {
    getNotes()
      .then(notes => {
        const index = notes.findIndex(item => item.id === currentId);
        if (index !== -1) notes.splice(index, 1);
        updateNotes(notes);
        goBack();
      })
      .catch(error => console.log(error));
  };

  // Function triggered when clicked on save changes in save/discard changes modal
  const saveChangesModal = () => {
    if (saveChanges() === -1) return;
    setTimeout(() => goBack(), 10);
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
      isThereChanges.current = true;
      setDisableSaveButton(false);
    } else {
      isThereChanges.current = false;
      setDisableSaveButton(true);
    }
  }, [currentTitle, currentContent, noteData]);

  // Function to handle hardware back button press
  const backButtonHandler = () => {
    if (isThereChanges.current) {
      setShowSaveAndClosePopup(true);
    } else {
      goBack();
    }
    return true;
  };

  // Function to get data from async-storage
  const getNotes = async () => {
    try {
      let notes = await AsyncStorage.getItem(NOTES_KEY);
      if (!notes) {
        updateNotes([]);
        return getNotes();
      }
      return JSON.parse(notes);
    } catch (e) {
      return e;
    }
  };

  // Function to update data to async-storage
  const updateNotes = async newdata => {
    try {
      await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(newdata));
    } catch (e) {
      return e;
    }
  };

  // Function to trigger when component mounts
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backButtonHandler);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backButtonHandler);
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* Header Buttons - back, save, delete */}
      <View style={styles.headerButtons}>
        <Button title="Back" onPress={goBackHandler} />
        <Button
          title="Save"
          onPress={saveChanges}
          disabled={disableSaveButton}
        />
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
          title={
            <Image
              style={{width: wp(20), height: wp(20)}}
              source={require('./../../src/images/icons/textSize.png')}
            />
          }
        />
        <Button
          styleContainer={{backgroundColor: 'white', height: hp(40)}}
          styleText={{color: 'black'}}
          title={
            <Image
              style={{width: wp(20), height: wp(20)}}
              source={require('./../../src/images/icons/textColor.png')}
            />
          }
        />
        <Button
          styleContainer={{backgroundColor: 'white', height: hp(40)}}
          styleText={{color: 'black'}}
          title={
            <Image
              style={{width: wp(20), height: wp(20)}}
              source={require('./../../src/images/icons/textBold.png')}
            />
          }
        />
        <Button
          styleContainer={{backgroundColor: 'white', height: hp(40)}}
          styleText={{color: 'black'}}
          title={
            <Image
              style={{width: wp(20), height: wp(20)}}
              source={require('./../../src/images/icons/textItalic.png')}
            />
          }
        />
        <Button
          styleContainer={{backgroundColor: 'white', height: hp(40)}}
          styleText={{color: 'black'}}
          title={
            <Image
              style={{width: wp(20), height: wp(20)}}
              source={require('./../../src/images/icons/textUnderline.png')}
            />
          }
        />
        <Button
          styleContainer={{backgroundColor: 'white', height: hp(40)}}
          styleText={{color: 'black'}}
          title={
            <Image
              style={{width: wp(20), height: wp(20)}}
              source={require('./../../src/images/icons/textHighlight.png')}
            />
          }
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
