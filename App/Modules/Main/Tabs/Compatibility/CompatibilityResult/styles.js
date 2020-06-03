import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  compatibilityResult: {
    flex: 1,
    marginHorizontal: scale(20),
    borderTopColor: '#DFDFDF',
    borderTopWidth: 1,
    paddingTop: verticalScale(17.5),
  },
  resultTitleText: {
    fontFamily: 'Segoe-UI-Bold',
    fontSize: moderateScale(14),
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  resultsubTitleText: {
    fontFamily: 'Segoe-UI-Bold',
    fontSize: moderateScale(14),
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 5
  },
  avatarImageContainer: {
    width: scale(300),
    height: verticalScale(300),
  },
  avatarImage: {
    flex: 1,
    borderRadius: 20
  },
  avatarHeader: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: 10
  },
  usernameText: {
    fontFamily: 'Segoe-UI-Bold',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginTop: 15,
    color: 'white'
  },
  personaliteText: {
    fontFamily: 'Segoe-UI-Bold',
    fontSize: moderateScale(16),
    textTransform: 'uppercase'
  },
  subPersonaliteText: {
    fontFamily: 'Segoe-UI-Bold',
    fontSize: moderateScale(12),
    textTransform: 'uppercase',
    color: 'white'
  },
  iconStyle: {
    width: verticalScale(60),
    height: verticalScale(35),
    right: 0,
    resizeMode: 'cover'
  },
  userInfos: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    textAlign: 'left',
    alignItems: 'flex-start'
  },
  headerText: {
    fontFamily: 'Segoe-UI-Bold',
    fontSize: verticalScale(12),
    color: '#fff'
  },
  lastMessageText: {
    textAlign: 'center'
  }
});
