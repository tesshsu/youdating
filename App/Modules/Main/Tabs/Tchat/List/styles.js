import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale, scale } from '../../../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  titleText: {
    fontFamily: 'Segoe-UI-Bold',
    fontSize: moderateScale(15),
    color: 'black',
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(6),
    textAlign: 'center',
    paddingHorizontal: scale(30),
    textTransform: 'uppercase'
  },
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  flatListContent: {
    paddingHorizontal: scale(10)
  },
  messageListItem: {
    flexDirection: 'row',
    paddingVertical: verticalScale(5)
  },
  messageNameList: {
    fontSize: 10,
    textTransform: 'uppercase',
    fontFamily: 'Segoe-UI-Bold'
  },
  imageStyle: {
    height: verticalScale(145),
    width: scale(120),
    margin: scale(6),
    borderRadius: verticalScale(10),
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
  grayText: {
    fontFamily: 'Segoe-UI-Bold',
    fontSize: moderateScale(14),
    color: 'gray',
    textTransform: 'uppercase'
  },
  msgTitle: {
    fontFamily: 'Segoe-UI-Bold',
    fontSize: moderateScale(11),
    color: 'black',
    paddingTop: 5
  },
  timeText: {
    fontFamily: 'Segoe-UI-Bold',
    fontSize: moderateScale(11),
  },
  personnalityText: {
    fontSize: moderateScale(12),
    textTransform: 'uppercase',
    marginLeft: scale(3),
    marginRight: scale(3),
    marginBottom: verticalScale(10)
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
  },
  imageBackground: {
    width: scale(170),
    height: verticalScale(190),
    borderRadius: verticalScale(25),
  },
  imageBackgroundImage: {
    borderRadius: verticalScale(25)
  },
  modeSelector: {
    marginTop: 20,
    marginBottom: 8
  },
  searchField: {
    backgroundColor: 'white',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    height: '10%',
    width: '90%'
  },
  searchBlock: {
    alignItems: 'center',
    marginTop: 10
  },
  searchInner: {
    borderRadius: 10
  },
  messageCount: {
    borderRadius: 50,
    width: 20,
    alignItems: 'center',
    position: 'absolute',
    top: 45,
    left: 45
  },
  bigAvatarPart: {
    width: '100%',
    height: '48%',
    alignItems: 'center',
    marginTop: 20
  },
  line: {
    height: 1,
    backgroundColor: '#BEBEBE',
    marginTop: verticalScale(-10),
    marginBottom: verticalScale(10)
  },
  iconStyle: {
    width: verticalScale(60),
    height: verticalScale(35),
    position: 'absolute',
    bottom: 5,
    left: -5,
    resizeMode: 'cover'
  }
});
