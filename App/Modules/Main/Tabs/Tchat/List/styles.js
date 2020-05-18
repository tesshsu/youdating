import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale, scale } from '../../../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  titleText: {
    fontFamily: 'Segoe-UI-Bold',
    fontSize: moderateScale(15),
    color: 'black',
    paddingTop: verticalScale(6),
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
    paddingHorizontal: scale(20)
  },
  messageListItem: {
    flexDirection: 'row',
    paddingVertical: verticalScale(5)
  },
  imageStyle: {
    height: verticalScale(65),
    width: scale(65),
    margin: scale(6),
    borderRadius: verticalScale(50),
    resizeMode: 'cover',
    borderWidth: 2,
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
    fontFamily: 'Segoe-UI-Bold',
    fontSize: moderateScale(12),
    textTransform: 'uppercase',
    marginLeft: scale(3),
    marginRight: scale(3)
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
    marginTop: 8,
    marginBottom: 8
  },
  searchField: {
    backgroundColor: 'white',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    width: '90%'
  },
  searchInner: {
    borderRadius: 10,
    height: 20,
    backgroundColor: '#e1e1e1'
  },
  messageCount: {
    borderRadius: 50,
    width: 20,
    alignItems: 'center',
    position: 'absolute',
    top: 45,
    left: 45
  }
});
