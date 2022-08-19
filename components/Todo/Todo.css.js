import {StyleSheet} from 'react-native';
import {wp, hp} from '../../utils/dimension';

export const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    height: hp(50),
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    paddingLeft: wp(20),
  },
});
