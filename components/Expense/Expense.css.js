import {StyleSheet} from 'react-native';
import {wp, hp} from '../../utils/dimension';

export const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    minHeight: hp(50),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
  },
  category: {
    fontSize: 15,
    color: 'black',
    paddingLeft: wp(20),
    width: wp('60%'),
  },
  amount: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    width: wp('30%'),
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
    color: 'black',
  },
  modalItemContainer: {
    alignSelf: 'center',
    width: wp('90%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  modalItemTitle: {fontSize: 18, color: 'black', width: '25%'},
  modalItemInput: {
    borderBottomWidth: 1,
    width: '50%',
    marginHorizontal: wp(20),
    fontSize: 15,
    padding: 0,
  },
  modalItemButtonContainer: {
    marginTop: hp(30),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalItemButton: {
    width: wp('40%'),
    justifyContent: 'center',
    borderWidth: 1,
  },
});
