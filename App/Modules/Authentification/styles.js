import { StyleSheet } from 'react-native';
import { verticalScale, scale, moderateScale } from '../../Helpers/ScaleHelper';
import colors from '../../Assets/css';
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
    width: '100%'
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
  subTitleText: {
    fontFamily: 'NewTaiLue-Bold',
    fontSize: moderateScale(20),
    color: colors.WHITE,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: verticalScale(56)
  },
  or: {
    marginVertical: verticalScale(23),
    flexDirection: 'row',
    alignItems: 'center'
  },
  bar: {
    flex: 1,
    height: 1,
    backgroundColor: colors.WHITE
  },
  orText: {
    fontFamily: 'NewTaiLue-Bold',
    fontSize: moderateScale(14),
    textTransform: 'uppercase',
    color: colors.WHITE,
    paddingHorizontal: scale(22)
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
  switchSelector: {
    width: '100%',
    marginTop: verticalScale(23)
  },
  ageView: {
    flexDirection:'row', 
    flexWrap:'wrap', 
    marginTop: 20, 
    justifyContent: 'space-between', 
    alignItems: 'center'
  },
  columnTextField: {
    width: '25%'
  },
  submitButton: {
    alignSelf: 'center',
    marginTop: verticalScale(30),
    backgroundColor: '#d412c7'
  },
  linearGradient: {
    marginTop: moderateScale(43),
    flex: 1,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 20
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    color: colors.WHITE,
    backgroundColor: 'transparent',
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
