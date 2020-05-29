import { StyleSheet } from 'react-native';
import { verticalScale, scale, moderateScale } from '../../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  imageContainer: {
    justifyContent: 'center'
  },
  imageBackground: {
    width: scale(420),
    height: verticalScale(200)
  },
  imageLabelText: {
    fontFamily: 'Segoe-UI-Bold',
    fontSize: moderateScale(20),
    marginTop: -20,
    marginLeft: 10
  },
  imageBackgroundImage: {
    width: scale(350),
    height: verticalScale(170),
    borderRadius: verticalScale(30)
  },
  moodTitleText: {
    textAlign: 'center',
    fontFamily: 'Segoe-UI-Regular',
    textTransform: 'uppercase',
    fontSize: moderateScale(19),
    marginBottom: verticalScale(18),
    marginTop: verticalScale(18)
  },
  question: {
    fontFamily: 'Segoe-UI-Regular',
    textTransform: 'uppercase',
    color: '#7D7D7D',
    marginTop: 15,
    marginLeft: 30,
    marginBottom: 25
  },
  line: {
    height: 1,
    backgroundColor: '#7D7D7D',
    marginBottom: 20
  },
  passBoutton: {
    marginBottom: 20,
  },
});
