import { StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from '../../../Helpers/ScaleHelper';
import colors from '../../../Assets/css';
export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: verticalScale(22),
    paddingHorizontal: scale(5),
    backgroundColor: 'white'
  },
  scrollViewContent: {
    paddingHorizontal: scale(30),
    paddingBottom: verticalScale(50)
  },
  button: {
    height: verticalScale(72),
	  marginTop: 10,
    borderWidth: 2,
    borderColor: colors.PINK,
    backgroundColor: colors.WHITE,
    shadowColor: colors.BLACK,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 6,
    justifyContent: 'center',
    elevation: 2
  },
  buttonText: {
    color: colors.PINK,
    fontFamily: 'NewTaiLue-Bold',
    fontSize: moderateScale(15),
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 20
  },
  buttonTextGradient: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    color: colors.WHITE
  },
  button: {
    alignSelf: 'center',
    marginTop: verticalScale(5),
    width: verticalScale(254),
    height: verticalScale(54),
    borderRadius: verticalScale(10),
    shadowColor: 'black',
    shadowOpacity: 0.33,
    shadowRadius: 3,
    backgroundColor: 'white',
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
