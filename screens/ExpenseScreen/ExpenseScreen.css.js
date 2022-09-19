import {StyleSheet} from 'react-native';
import {hp, wp} from '../../utils/dimension';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  category: {
    color: 'black',
    width: wp('100%'),
    textAlign: 'center',
    fontSize: 20,
    borderBottomWidth: 1,
    paddingVertical: hp(10),
    color: 'grey',
    backgroundColor: 'rgba(12, 12, 12, 0.1)',
  },
  expenseItem: {
    width: wp('100%'),
    borderWidth: 1,
    flexDirection: 'row',
  },
  itemHeadingContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: hp(10),
  },
  itemHeadingValue: {
    fontSize: 18,
    color: 'black',
  },
  emptyPage: {
    flex: 1,
  },
});
