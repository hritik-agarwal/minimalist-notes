import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import React, {useEffect, useState} from 'react';
import {styles} from './Habit.css';
import {wp} from '../../utils/dimension';
import {useNavigation} from '@react-navigation/native';
import Button from '../../components/Button/Button';

const Habit = props => {
  const navigation = useNavigation();
  const {id, title, datesMarked, deleteHabit, saveHabit} = props;
  const [target, setTarget] = useState(0);
  const [newTitle, setNewTitle] = useState(title);
  const [editMode, setEditMode] = useState(false);
  const [showConfirmDeletePopup, setShowConfirmDeletePopup] = useState(false);

  useEffect(() => {
    setTarget(Math.ceil((datesMarked.length + 1) / 7) * 7);
  }, [datesMarked]);

  const getTodayDate = () => {
    return new Date().toLocaleDateString();
  };

  return (
    <View style={styles.container}>
      <View style={{width: '10%'}}>
        <CheckBox
          style={{width: 20, height: 20, borderRadius: 10}}
          value={datesMarked.includes(getTodayDate())}
          onValueChange={newValue => {
            const date = getTodayDate();
            let newDatesMarked = datesMarked;
            if (newValue) newDatesMarked.push(date);
            else {
              const index = datesMarked.indexOf();
              newDatesMarked = newDatesMarked.filter(item => item !== date);
            }
            saveHabit(id, title, newDatesMarked);
          }}
        />
      </View>
      <TouchableOpacity onLongPress={() => setEditMode(true)}>
        {editMode === true ? (
          <TextInput
            maxLength={50}
            autoFocus={true}
            style={[styles.title, {paddingLeft: 0}]}
            value={newTitle}
            onChangeText={text => setNewTitle(text)}
          />
        ) : (
          <Text style={styles.title}>{title}</Text>
        )}
      </TouchableOpacity>
      <View
        style={{
          width: wp('20%'),
          height: '100%',
          position: 'absolute',
          right: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {editMode === true ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Button
              title={
                <Image
                  style={{width: wp(20), height: wp(20)}}
                  source={require('./../../src/images/icons/delete.png')}
                />
              }
              styleContainer={{backgroundColor: 'transparent'}}
              styleText={{color: 'black', marginTop: -10}}
              onPress={() => setShowConfirmDeletePopup(true)}
            />
            <Button
              title="Save"
              styleContainer={{backgroundColor: 'transparent'}}
              styleText={{color: 'black', fontSize: 18, paddingLeft: 0}}
              onPress={() => {
                if (title !== newTitle) saveHabit(id, newTitle, datesMarked);
                setEditMode(false);
              }}
            />
          </View>
        ) : (
          <Text style={{fontSize: 15, fontWeight: 'bold', color: 'black'}}>
            {datesMarked.length}/{target}
          </Text>
        )}
      </View>
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
          <Button title="Yes" onPress={() => deleteHabit(id)} />
          <Button title="No" onPress={() => setShowConfirmDeletePopup(false)} />
        </View>
      </Modal>
    </View>
  );
};

export default Habit;
