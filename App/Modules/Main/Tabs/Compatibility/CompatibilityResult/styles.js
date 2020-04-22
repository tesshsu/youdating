import { StyleSheet } from 'react-native';

import { scale, verticalScale, moderateScale } from '../../../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  compatibilityResult: {
    flex: 1,
    marginHorizontal: scale(30),
    borderTopColor: '#DFDFDF',
    borderTopWidth: 1,
    marginTop: verticalScale(13.5),
    paddingTop: verticalScale(17.5),
    justifyContent: 'space-between'
  },
  resultTitleText: {
    fontFamily: 'Segoe-UI-Bold',
    fontSize: moderateScale(15),
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  resultText: {
    fontFamily: 'Segoe-UI-Bold',
    fontSize: moderateScale(14),
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: verticalScale(8)
  },
  resultBodyText: {
    fontFamily: 'NewTaiLue-Regular',
    fontSize: moderateScale(14),
    textAlign: 'center',
    color: '#898888',
  },
  usersRow: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: scale(218),
  },
  userContainer: {
    alignItems: 'center'
  },
  imageBackground: {
    width: scale(82),
    height: verticalScale(93),
    borderRadius: verticalScale(8),
  },
  imageBackgroundImage: {
    borderRadius: verticalScale(8)
  },
  usernameText: {
    fontFamily: 'Segoe-UI-Bold',
    fontSize: moderateScale(14),
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  vsText: {
    fontFamily: 'NewTaiLue-Bold',
    fontSize: moderateScale(15),
    paddingTop: verticalScale(40)
  },
  button: {
    alignSelf: 'center',
    width: scale(274),
    height: verticalScale(31),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: verticalScale(7),
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 6,
    marginBottom: verticalScale(18)
  },
  buttonText: {
    fontFamily: 'Segoe-UI-Bold',
    color: 'white',
    fontSize: moderateScale(12),
    textTransform: 'uppercase'
  }
});
