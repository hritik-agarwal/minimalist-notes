import {StyleSheet} from 'react-native';
import {hp, wp} from '../../utils/dimension';

export const styles = StyleSheet.create({
  container: {
    height: hp(50),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    padding: wp(8),
    color: 'black',
  },
});
