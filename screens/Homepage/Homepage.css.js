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
  createNewNoteButton: {
    width: wp('100%'),
    position: 'absolute',
    bottom: 0,
  },
  emptyPage: {
    // marginBottom: hp(50),
  },
});
