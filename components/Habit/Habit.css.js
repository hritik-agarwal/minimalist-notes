import {StyleSheet} from 'react-native';
import {wp, hp} from '../../utils/dimension';

export const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    minHeight: hp(50),
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: 'black',
    width: wp('70%'),
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
