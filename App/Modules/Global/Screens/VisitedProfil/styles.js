import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import { verticalScale, scale, moderateScale } from '../../../../Helpers/ScaleHelper';

const AVATAR_PADDING = Constants.platform.android
  ? Constants.statusBarHeight
  : 0;

export default StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  avatarContainer: {
    height: verticalScale(400),
  },
  header: {
    marginLeft: scale(30),
    marginRight: scale(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: verticalScale(10) + AVATAR_PADDING
  },
  headerTextContainer: {
    position: 'relative'
  },
  headerText: {
    fontFamily: 'Gadugi-Bold',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'black',
    textShadowRadius: 3,
    textShadowOffset: { width: 0, height: 0 },
    elevation: 2
  },
  headerOnline: {
    width: scale(6),
    height: verticalScale(6),
    borderRadius: scale(3),
    position: 'absolute',
    right: scale(-10),
    top: verticalScale(2),
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOffset: { y: 0, x: 0 },
    elevation: 2
  },
  avatar: {
    flex: 1,
    width: '100%',
  },
  rightButtons: {
    position: 'absolute',
    bottom: verticalScale(23),
    right: scale(10),
    flexDirection: 'column'
  },
  leftButtons: {
    position: 'absolute',
    top: verticalScale(90),
    left: scale(10),
    flexDirection: 'column'
  },
  scrollViewContent: {
    flex: 1,
    paddingTop: verticalScale(30),
  },
  profilInfos: {
    position: 'absolute',
    left: verticalScale(10),
    bottom: verticalScale(22)
  },
  firstName: {
    marginBottom: verticalScale(-5),
    fontFamily: 'Gadugi-Bold',
    fontSize: moderateScale(21),
    lineHeight: 0,
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'uppercase',
    textShadowColor: 'black',
    textShadowRadius: 3,
    textShadowOffset: { width: 0, height: 0 },
    elevation: 2
  },
  profilType: {
    fontFamily: 'Gadugi-Bold',
    fontSize: moderateScale(25),
    lineHeight: 0,
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'uppercase',
    textShadowColor: 'black',
    textShadowRadius: 3,
    textShadowOffset: { width: 0, height: 0 },
    elevation: 2
  },
  personality: {
    fontFamily: 'Gadugi-Bold',
    fontSize: moderateScale(18),
    lineHeight: 0,
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'uppercase',
    textShadowColor: 'black',
    textShadowRadius: 3,
    textShadowOffset: { width: 0, height: 0 },
    elevation: 2
  },
  sceneWrapper: {
    paddingHorizontal: scale(30),
    paddingBottom: verticalScale(30)
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: scale(4),
    right: scale(4),
    height: verticalScale(127)
  },
  row: {
    paddingVertical: verticalScale(14),
    borderBottomColor: '#ADADAD'
  },
  rowText: {
    textAlign: 'center',
    fontFamily: 'NewTaiLue-Bold',
    fontSize: moderateScale(15)
  }
});
