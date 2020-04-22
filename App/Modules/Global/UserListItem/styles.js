import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: verticalScale(15),
    alignItems: 'center',
    width: '100%'
  },
  image: {
    width: scale(50),
    borderRadius: 15,
    height: verticalScale(50),
    marginRight: scale(10),
    resizeMode: 'cover'
  },
  title: {
    fontFamily: 'Segoe-UI-Bold',
    fontSize: moderateScale(16),
    textTransform: 'uppercase'
  },
  subTitle: {
    position: 'relative',
    fontFamily: 'Gadugi-Bold',
    fontSize: moderateScale(13),
    color: '#848484'
  },
  subSubTitle: {
    fontFamily: 'Segoe-UI-Regular',
    fontSize: moderateScale(13),
    color: '#8D8D8D'
  },
  body: {
    flex: 1
  },
  right: {
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    alignItems: 'flex-end'
  },
  rightText: {
    fontFamily: 'Segoe-UI-Bold',
    fontSize: moderateScale(13),
    color: '#8D8D8D'
  },
  button: {
    marginTop: verticalScale(9),
    width: scale(100),
    height: verticalScale(25),
    borderRadius: verticalScale(6),
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontFamily: 'Gadugi-Bold',
    color: 'white',
    fontSize: moderateScale(13)
  }
});
