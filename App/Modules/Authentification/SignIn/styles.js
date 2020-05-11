import { StyleSheet } from 'react-native';
import { verticalScale, scale, moderateScale } from '../../../Helpers/ScaleHelper';

const back_img_signIn = require("../../../../assets/images/signUpBackground.png");
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  bakcgroundImage: {
    flex: 1,
    width: null,
    height: null
  },
  fill: {
    flex: 1,
  },
  keyboardAvoidingViewContent: {
    position: 'relative',
    backgroundColor: 'white'
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContainer: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  content: {
    paddingHorizontal: scale(63),
    paddingTop: verticalScale(67),
    paddingBottom: verticalScale(140),
    alignItems: 'center',
    backgroundColor: 'transparent',
    justifyContent: 'flex-end'
  },
  createAccountText: {
    fontFamily: 'NewTaiLue-Bold',
    fontSize: moderateScale(18),
    color: '#d412c7',
    alignSelf: 'flex-start'
  },
  textField: {
    width: '100%',
    marginTop: verticalScale(23)
  },
  submitButton: {
    alignSelf: 'center',
    marginTop: verticalScale(30),
    backgroundColor: '#d412c7'
  },
  link: {
    marginVertical: verticalScale(30)
  },
  linkText: {
    fontFamily: 'NewTaiLue-Bold',
    fontSize: moderateScale(13),
    textAlign: 'center',
    textTransform: 'uppercase',
    textDecorationLine: 'underline',
    color: '#d412c7'
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  }
});
