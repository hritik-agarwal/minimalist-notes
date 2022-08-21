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
    width: wp('80%'),
    color: 'black',
  },
});
