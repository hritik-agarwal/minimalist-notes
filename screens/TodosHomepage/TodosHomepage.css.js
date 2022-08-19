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
  createNewTodoButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: hp(10),
  },
});
