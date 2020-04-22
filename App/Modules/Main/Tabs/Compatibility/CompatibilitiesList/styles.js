import { StyleSheet, Dimensions } from 'react-native';
import { verticalScale, scale } from '../../../../../Helpers/ScaleHelper';

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
    height: verticalScale(150)
  },
  avatarContainer: {
    borderWidth: 3,
    borderColor: 'transparent',
    padding: scale(3),
    marginBottom: verticalScale(3),
    marginLeft: scale(2),
    marginRight: scale(2),
    borderRadius: verticalScale(8),
  },
  imageBackground: {
    height: verticalScale(74),
    width: scale(74),
    borderRadius: verticalScale(8),
  },
  imageBackgroundImage: {
    borderRadius: verticalScale(8)
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
    textTransform: 'uppercase'
  },
  compatibilityText: {
    fontFamily: 'Segoe-UI-Regular',
    fontSize: 11
  }
});
