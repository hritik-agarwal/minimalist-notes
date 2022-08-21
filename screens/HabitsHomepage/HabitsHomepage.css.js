import {StyleSheet} from 'react-native';
import {hp, wp} from '../../utils/dimension';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  createNewHabitButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: hp(10),
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    backfaceVisibility: 'visible',
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    padding: hp(20),
    borderWidth: 1,
  },
  modalText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: hp(10),
  },
});
