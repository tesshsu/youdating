import { StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from '../../../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  scrollViewContent: {
    alignItems: 'center'
  },
  title: {
    fontFamily: 'Segoe-UI-Bold',
    fontSize: moderateScale(14),
    color: 'black',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  image: {
    width: scale(372),
    height: verticalScale(248),
    borderRadius: verticalScale(10),
    resizeMode: 'cover',
    marginTop: verticalScale(35),
    marginBottom: verticalScale(21)
  },
  buttonsRow: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 34
  },
  button: {
    alignSelf: 'center',
    marginTop: verticalScale(17),
    width: verticalScale(54),
    height: verticalScale(54),
    borderRadius: verticalScale(54 / 2),
    shadowColor: 'black',
    shadowOpacity: 0.33,
    shadowRadius: 3,
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: verticalScale(3) },
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
