import {hp, wp} from '../../utils/dimension';

import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  budgetExpenseContainer: {
    flexDirection: 'row',
    paddingBottom: hp(15),
  },
  budgetExpenseItemContainer: {
    width: wp('100%'),
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  budgetExpenseItemText: {colore: 'black', fontSize: 18},
});
