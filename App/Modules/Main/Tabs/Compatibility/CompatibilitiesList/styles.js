import { StyleSheet, Dimensions } from 'react-native';
import { verticalScale, scale, moderateScale } from '../../../../../Helpers/ScaleHelper';


export default StyleSheet.create({
  flatListContent: {
    paddingHorizontal: scale(28)
  },
  usersContainer: {
    width: Dimensions.get('screen').width,
    paddingHorizontal: scale(28),
    flexDirection: 'row',
    alignSelf: 'flex-start'
  },
  itemContainer: {
    alignItems: 'center',
    height: verticalScale(250)
  },
  avatarContainer: {
    borderWidth: 2,
    borderColor: 'transparent',
    padding: scale(1),
    marginBottom: verticalScale(3),
    marginLeft: scale(2),
    marginRight: scale(2),
    borderRadius: verticalScale(50),
  },
  imageBackground: {
    height: verticalScale(65),
    width: scale(65),
    margin: scale(6),
    borderRadius: verticalScale(50),
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  imageBackgroundImage: {
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: verticalScale(50),
  },
  usernameText: {
    fontFamily: 'Gadugi-Bold',
    fontSize: 10,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  personnalityText: {
    fontFamily: 'Gadugi-Bold',
    fontSize: 11,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: 10
  },
  compatibilityText: {
    fontFamily: 'Segoe-UI-Regular',
    fontSize: 11
  },
  imageStyle: {
    height: verticalScale(65),
    width: scale(65),
    margin: scale(6),
    borderRadius: verticalScale(50),
    resizeMode: 'cover',
    paddingRight: 10,
    borderWidth: 2,
  },
  usernameText: {
    fontFamily: 'Segoe-UI-Bold',
    fontSize: moderateScale(14),
    color: 'black',
    textTransform: 'uppercase'
  },
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
});
