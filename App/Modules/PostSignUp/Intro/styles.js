import { StyleSheet, Dimensions } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../Helpers/ScaleHelper';
import colors from '../../../Assets/css';
export const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT
} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  image: {
    width: scale(416),
    height: verticalScale(285),
    resizeMode: 'cover'
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
  },
  linearGradient: {
    flex: 1,
    width: 300,
    marginLeft: 45,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10
  },
  textMood: {
    textAlign: 'center',
    color: colors.GREY
  },
  uploadPhotoCenterPart: {
    height: verticalScale(300),
    marginTop: 150
  },
  textPhoto: {
    textAlign: 'center',
    fontFamily: 'Segoe-UI-Bold',
    fontSize: 16,
    color: colors.PINK
  },
  uploadPhotoPart: {
    marginTop: 30,
    marginLeft: 10
  },
  line: {
    height: 1,
    backgroundColor: '#BEBEBE',
    marginTop: verticalScale(33)
  },
  buttonTextGradient: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    color: colors.WHITE,
    backgroundColor: 'transparent',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  }
});
