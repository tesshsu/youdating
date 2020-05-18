import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import { verticalScale, scale, moderateScale } from '../../../../Helpers/ScaleHelper';

const HEADER_PADDING = Constants.platform.android
  ? Constants.statusBarHeight
  : 0;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  header: {
    paddingTop: verticalScale(18) + HEADER_PADDING,
    paddingBottom: verticalScale(20),
    paddingHorizontal: scale(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  userInfos: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: scale(34),
    alignItems: 'center'
  },
  userHeaderImage: {
    borderRadius: verticalScale(50),
    height: scale(66),
    width: scale(66),
    marginRight: scale(12),
    resizeMode: 'cover'
  },
  usernameText: {
    fontFamily: 'Segoe-UI-Bold',
    fontSize: moderateScale(14),
    color: 'black',
    textTransform: 'uppercase'
  },
  personnality: {
    fontFamily: 'Segoe-UI-Bold',
    fontSize: 12,
    color: 'white',
    textTransform: 'uppercase'
  },
  mood: {
    fontFamily: 'Segoe-UI-Regular',
    fontSize: 12,
    color: 'white',
    textTransform: 'uppercase'
  },
  keyboardAvoidingView: {
    flex: 1
  },
  keyboardAvoidingViewContent: {
    flex: 1
  },
  keyboardAvoidingViewInner: {
    flex: 1,
    position: 'relative'
  },
  title: {
    fontFamily: 'Segoe-UI-Bold',
    fontSize: 15,
    color: 'black',
    textTransform: 'uppercase',
    marginVertical: verticalScale(26),
    textAlign: 'center'
  },
  jobsContainer: {
    marginHorizontal: scale(45),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  jobContainer: {
    paddingHorizontal: scale(14),
    paddingVertical: scale(14),
    shadowColor: '#000000',
    shadowOpacity: 0.23,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 9,
    backgroundColor: 'white'
  },
  jobTitleText: {
    fontFamily: 'Segoe-UI-Bold',
    color: 'black',
    fontSize: 13,
    textAlign: 'center',
    marginTop: verticalScale(12),
    textTransform: 'uppercase'
  },
  compatibilityText: {
    fontFamily: 'Segoe-UI-Regular',
    fontSize: 13,
    color: '#969191',
    textAlign: 'center',
    marginTop: verticalScale(28),
    textTransform: 'uppercase'
  },
  locked: {
    paddingTop: verticalScale(15),
    paddingHorizontal: scale(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockedText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Segoe-UI-Bold',
    fontSize: moderateScale(12),
    marginLeft: scale(5),
    marginTop: verticalScale(10),
    textTransform: 'uppercase'
  }
});
