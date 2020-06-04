import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  button: {
    alignSelf: 'center'
  },
  scrollView: {
    flex: 1
  },
  scrollViewContent: {
    paddingHorizontal: scale(30)
  },
  image: {
    width: scale(414),
    height: verticalScale(217),
    resizeMode: 'cover'
  },
  mainTitleText: {
    marginTop: verticalScale(17),
    fontFamily: 'NewTaiLue-Bold',
    fontSize: moderateScale(18),
    color: 'black',
    textAlign: 'center'
  },
  titleText: {
    fontFamily: 'NewTaiLue-Bold',
    fontSize: moderateScale(15),
    color: '#84B5E4',
    marginTop: verticalScale(16),
    textAlign: 'center'
  },
  adviceText: {
    marginTop: verticalScale(16),
    fontFamily: 'NewTaiLue-Bold',
    textAlign: 'center',
    fontSize: moderateScale(14)
  },
  paragraph: {
    marginTop: verticalScale(10),
    textAlign: 'center',
    fontFamily: 'NewTaiLue-Regular',
    fontSize: moderateScale(14),
    color: '#BBB8B8',
  }
});