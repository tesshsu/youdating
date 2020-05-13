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
    borderWidth: 2,
    borderColor: colors.PINK,
    backgroundColor: 'white',
    shadowColor: 'black',
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
});
