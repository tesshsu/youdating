import {
  StyleSheet,
  Dimensions
} from 'react-native';
import {
  scale,
  verticalScale,
  moderateScale
} from '../../../../../../../Helpers/ScaleHelper';

const SCREEN_WIDTH = Dimensions.get('screen').width;

export default StyleSheet.create({
  itemContainer: {
    paddingHorizontal: scale(30),
    paddingBottom: verticalScale(35),
    marginBottom: verticalScale(5),
    height: '100%',
    width: SCREEN_WIDTH
  },
  imageContainer: {
    flex: 1,
    borderRadius: verticalScale(15)
  },
  image: {
    borderRadius: verticalScale(15)
  },
  profileFooterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: verticalScale(15)
  },
  usernameText: {
    fontFamily: 'Segoe-UI-Bold',
    fontSize: moderateScale(20),
    color: 'black',
    textTransform: 'uppercase'
  },
  userInfosText: {
    fontFamily: 'Gadugi-Bold',
    fontSize: moderateScale(14),
    textTransform: 'uppercase',
    color: '#848484'
  },
  citation: {
    marginHorizontal: scale(5),
    fontFamily: 'Gadugi-Bold',
    fontSize: moderateScale(15),
    color: '#676767',
    textAlign: 'center'
  }
});
