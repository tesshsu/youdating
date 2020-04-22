import { StyleSheet, Dimensions } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../Helpers/ScaleHelper';

export const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT
} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row'
  },
  slideWrapper: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: 'white'
  },
  image: {
    width: scale(416),
    height: verticalScale(285),
    resizeMode: 'cover'
  },
  mainTitleText: {
    marginTop: verticalScale(20),
    fontFamily: 'NewTaiLue-Bold',
    fontSize: moderateScale(18),
    paddingHorizontal: scale(30),
    textAlign: 'center'
  },
  mainSubTitleText: {
    marginTop: verticalScale(2),
    fontFamily: 'NewTaiLue-Bold',
    fontSize: moderateScale(15),
    textAlign: 'center',
    color: 'black',
    paddingHorizontal: scale(30),
  },
  titleText: {
    marginTop: verticalScale(19),
    fontFamily: 'NewTaiLue-Bold',
    fontSize: moderateScale(16),
    textAlign: 'left',
    paddingHorizontal: verticalScale(25)
  },
  paragraph: {
    marginTop: verticalScale(17),
    fontFamily: 'NewTaiLue-Regular',
    fontSize: moderateScale(14),
    textAlign: 'left',
    paddingLeft: scale(40),
    paddingRight: scale(20),
    color: '#717273'
  },
  yousText: {
    fontFamily: 'NewTaiLue-Regular',
    fontSize: moderateScale(14),
    paddingHorizontal: verticalScale(25)
  },
  scrollView: {
    flex: 1
  },
  dotsContainer: {
    marginTop: verticalScale(25),
    marginBottom: verticalScale(15),
    flexDirection: 'row',
    justifyContent: 'center'
  },
  dot: {
    width: verticalScale(10),
    height: verticalScale(10),
    borderRadius: verticalScale(5),
    backgroundColor: '#DEE1E4',
    marginHorizontal: scale(3.5)
  },
  bar: {
    height: verticalScale(10)
  },
  button: {
    marginTop: verticalScale(10),
    alignSelf: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
      elevation: 2
    }
  }
});
