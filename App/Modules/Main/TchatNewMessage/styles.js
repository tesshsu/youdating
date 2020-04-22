import { StyleSheet } from 'react-native';
import { verticalScale, moderateScale, scale } from '../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: verticalScale(27),
    paddingBottom: verticalScale(37)
  },
  titleText: {
    fontFamily: 'Segoe-UI-Bold',
    fontSize: moderateScale(15),
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: verticalScale(28)
  },
  image: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover'
  },
  userInfos: {
    paddingVertical: verticalScale(10),
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1'
  },
  usernameText: {
    fontFamily: 'Segoe-UI-Bold',
    fontSize: moderateScale(18),
    color: 'black',
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  ageAndPlaceText: {
    fontFamily: 'Gadugi-Bold',
    fontSize: moderateScale(18),
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#807E7F'
  },
  personnalityText: {
    fontFamily: 'NewTaiLue-Bold',
    fontSize: moderateScale(15),
    textTransform: 'uppercase',
    textAlign: 'center',
    marginTop: verticalScale(5)
  },
  message: {
    paddingTop: verticalScale(13),
    paddingBottom: verticalScale(50),
    paddingHorizontal: scale(30),
  },
  dayText: {
    fontFamily: 'Segoe-UI-Bold',
    fontSize: moderateScale(12),
    color: 'black',
    textAlign: 'center'
  },
  timeText: {
    fontFamily: 'Segoe-UI-Bold',
    fontSize: moderateScale(12),
    textAlign: 'center',
    color: '#036DD5'
  },
  messageContentText: {
    fontFamily: 'NewTaiLue-Regular',
    fontSize: moderateScale(14),
    color: '#8B8787',
    marginTop: verticalScale(12),
    lineHeight: verticalScale(21)
  },
  buttonsRow: {
    flexDirection: 'row',
    marginHorizontal: scale(40),
    justifyContent: 'space-between'
  },
  button: {
    width: scale(147),
    height: verticalScale(30),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: verticalScale(12)
  },
  buttonText: {
    fontFamily: 'Segoe-UI-Bold',
    fontSize: moderateScale(14),
    color: 'white',
    textTransform: 'uppercase'
  }
});
