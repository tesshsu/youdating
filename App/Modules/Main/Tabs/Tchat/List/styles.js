import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale, scale } from '../../../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  titleText: {
    fontFamily: 'Segoe-UI-Bold',
    fontSize: moderateScale(15),
    color: 'black',
    paddingTop: verticalScale(24),
    paddingBottom: verticalScale(24),
    textAlign: 'center',
    paddingHorizontal: scale(30),
    textTransform: 'uppercase'
  },
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  flatListContent: {
    paddingHorizontal: scale(20)
  },
  messageListItem: {
    flexDirection: 'row',
    paddingVertical: verticalScale(10)
  },
  imageStyle: {
    height: verticalScale(60),
    width: scale(50),
    marginRight: scale(10),
    borderRadius: verticalScale(8),
    resizeMode: 'cover'
  },
  body: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  headerLeft: {
    flex: 1
  },
  usernameText: {
    fontFamily: 'Segoe-UI-Bold',
    fontSize: moderateScale(14),
    color: 'black',
    textTransform: 'uppercase'
  },
  personnalityText: {
    fontFamily: 'Segoe-UI-Bold',
    fontSize: moderateScale(11),
    textTransform: 'uppercase'
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  lastMsgTimeText: {
    fontFamily: 'Segoe-UI-Regular',
    fontSize: moderateScale(13),
  },
  footer: {
    flexDirection: 'row'
  },
  lastMsgText: {
    flex: 1,
    fontFamily: 'Segoe-UI-Regular',
    fontSize: moderateScale(14),
    color: '#5A5757'
  },
  button: {
    marginLeft: scale(8)
  }
});
