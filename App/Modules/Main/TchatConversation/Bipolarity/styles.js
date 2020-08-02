import { Dimensions, StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from '../../../../Helpers/ScaleHelper';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  itemContainer: {
    width,
    alignItems: 'center'
  },
  imageContainer: {
    justifyContent: 'center',
    width,
  },
  imageBackground: {
    width: scale(420),
    height: verticalScale(200),
	marginTop: 5,
    alignItems: 'center',
  },
  imageLabelText: {
    fontFamily: 'Segoe-UI-Bold',
    fontSize: moderateScale(20),
    alignSelf: 'flex-start',
    marginTop:5,
    marginLeft: 10
  },
  imageBackgroundImage: {
    width: scale(350),
    height: verticalScale(155),
    borderRadius: verticalScale(30),
  },
  moodTitleText: {
    textAlign: 'center',
    fontFamily: 'Segoe-UI-Regular',
    textTransform: 'uppercase',
    fontSize: moderateScale(19),
    marginBottom: verticalScale(18),
    marginTop: verticalScale(18)
  },
  questionTitle: {
    fontFamily: 'Segoe-UI-Bold',
    textTransform: 'uppercase',
    color: '#222',
	fontSize: 18,
    marginTop: 15,
    marginLeft: 30
  },
  question: {
    fontFamily: 'Segoe-UI-Regular',
    textTransform: 'uppercase',
    color: '#7D7D7D',
	textAlign: 'center',
	fontSize: 14,
    marginTop: 10,
    marginLeft: 30
  },
  passBoutton: {
    marginBottom: 10,
  }
});
