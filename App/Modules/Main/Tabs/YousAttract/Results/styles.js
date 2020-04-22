import { StyleSheet } from 'react-native';
import { verticalScale, scale, moderateScale } from '../../../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    fontFamily: 'Segoe-UI-Bold',
    fontSize: moderateScale(15),
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: verticalScale(21)
  },
  list: {
    flex: 1
  },
  listContent: {
    paddingHorizontal: scale(30)
  },
  item: {
    flexDirection: 'row',
    paddingVertical: verticalScale(20)
  },
  left: {
    width: scale(151),
    marginRight: scale(35),
    paddingTop: verticalScale(8),
  },
  imageBackground: {
    width: '100%',
    height: verticalScale(163),
    borderRadius: verticalScale(8)
  },
  imageBackgroundImage: {
    borderRadius: verticalScale(8)
  },
  usernameText: {
    fontFamily: 'Gadugi-Bold',
    fontSize: moderateScale(13),
    color: 'red',
    textTransform: 'uppercase',
    marginTop: verticalScale(8)
  },
  userInfosText: {
    fontFamily: 'Gadugi-Bold',
    fontSize: moderateScale(12),
    color: '#736F6F',
    marginBottom: verticalScale(8),
    textTransform: 'uppercase'
  },
  buttons: {
    marginTop: verticalScale(6)
  },
  button: {
    marginBottom: verticalScale(10)
  },
  buttonText: {
    fontFamily: 'NewTaiLue-Regular',
    fontSize: moderateScale(7),
    textTransform: 'uppercase',
    color: '#9A9A9A',
    marginTop: verticalScale(7)
  },
  right: {
    flex: 1,
    marginLeft: scale(11)
  },
  rightUp: {
    marginBottom: verticalScale(66),
  },
  distanceText: {
    fontFamily: 'NewTaiLue-Bold',
    fontSize: moderateScale(12),
    textAlign: 'right'
  },
  timeText: {
    fontFamily: 'NewTaiLue-Regular',
    fontSize: moderateScale(11),
    textAlign: 'right'
  },
  citationText: {
    fontFamily: 'NewTaiLue-Regular',
    fontSize: moderateScale(12),
    textAlign: 'center',
    color: '#7A7A7A'
  }
});
