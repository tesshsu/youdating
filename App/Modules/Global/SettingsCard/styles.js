import { StyleSheet } from 'react-native';
import { verticalScale, moderateScale, scale } from '../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  container: {
    marginBottom: verticalScale(15)
  },
  title: {
    fontFamily: 'NewTaiLue-Bold',
    fontSize: moderateScale(15),
    color: 'black',
    marginBottom: verticalScale(10)
  },
  card: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#F5EFEF',
    borderRadius: 11,
    shadowOffset: { x: 0, y: 3 },
    shadowRadius: 6,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    paddingHorizontal: scale(4.5)
  },
  rightLabel: {
    position: 'absolute',
    top: verticalScale(10),
    right: scale(12),
    fontFamily: 'NewTaiLue-Regular',
    color: '#C4C3C3',
    fontSize: moderateScale(13)
  },
  settingItem: {
    paddingVertical: verticalScale(17.5),
    paddingHorizontal: scale(26),
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1
  }
});
