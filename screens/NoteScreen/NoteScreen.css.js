import {StyleSheet} from 'react-native';
import {hp, wp} from '../../utils/dimension';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    borderWidth: 1,
    padding: wp(5),
    fontSize: 20,
    borderColor: 'grey',
  },
  content: {
    borderWidth: 1,
    flex: 1,
    padding: wp(15),
    fontSize: 14,
  },
  backArrowContainer: {
    height: hp(30),
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
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
