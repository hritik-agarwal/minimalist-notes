import {StyleSheet} from 'react-native';
import {hp, wp} from '../../utils/dimension';

export const styles = StyleSheet.create({
  container: {
    maxWidth: '100%',
    height: hp(50),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    padding: wp(8),
  },
});
