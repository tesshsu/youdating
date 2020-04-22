import { StyleSheet } from 'react-native';
import { verticalScale, moderateScale } from '../../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: verticalScale(47),
    backgroundColor: 'white',
    borderTopColor: '#7E7E7E',
    borderTopWidth: 1
  },
  tabsContainer: {
    width: '100%',
    height: verticalScale(47),
    flexDirection: 'row',
  },
  tabContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  text: {
    marginTop: verticalScale(4),
    fontSize: moderateScale(9),
    color: '#7E7E7E'
  }
});
