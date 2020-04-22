import { StyleSheet } from 'react-native';
import { verticalScale, scale, moderateScale } from '../../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(5)
  },
  sectionTitleContainer: {
    marginTop: verticalScale(17),
    marginBottom: verticalScale(35)
  },
  statusText: {
    fontFamily: 'NewTaiLue-Regular',
    fontSize: 14,
    textTransform: 'uppercase',
    color: '#777676',
    textAlign: 'center'
  },
  tagText: {
    fontFamily: 'NewTaiLue-Regular',
    fontSize: 14,
    textTransform: 'uppercase',
    color: 'black',
    textAlign: 'center',
    marginTop: verticalScale(19)
  },
  description: {
    fontFamily: 'NewTaiLue-Regular',
    fontSize: moderateScale(14),
    color: '#8F8C8C',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: verticalScale(10)
  },
  tag: {
    color: '#000000',
    fontFamily: 'NewTaiLue-Regular',
    fontSize: moderateScale(14),
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: verticalScale(17)
  },
});
