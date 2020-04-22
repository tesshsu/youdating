import { StyleSheet } from 'react-native';

import { verticalScale, scale, moderateScale } from '../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  container: {
    marginBottom: verticalScale(20)
  },
  avatarContainer: {
    borderBottomColor: '#707070',
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    height: verticalScale(340)
  },
  addPhotoText: {
    fontFamily: 'NewTaiLue-Regular',
    textAlign: 'center',
    fontSize: moderateScale(14),
    textTransform: 'uppercase'
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: verticalScale(20),
    marginHorizontal: scale(16)
  },
  scrollViewContainer: {
    flex: 1,
    position: 'relative',
  },
  scrollViewContent: {
    paddingHorizontal: scale(63),
    paddingBottom: verticalScale(140),
    alignItems: 'stretch',
  },
  scrollViewInner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  section: {
    marginTop: verticalScale(15),
    alignItems: 'center'
  },
  button: {
    marginTop: verticalScale(13),
    paddingHorizontal: scale(32),
    paddingVertical: verticalScale(10),
    borderRadius: verticalScale(16),
    borderColor: '#BFB9B9',
    borderWidth: 1,
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'NewTaiLue-Bold',
    textAlign: 'center',
    fontSize: moderateScale(14),
    textTransform: 'uppercase',
    color: '#84B5E4'
  },
  sectionTitleText: {
    fontFamily: 'NewTaiLue-Regular',
    textAlign: 'center',
    fontSize: moderateScale(14),
    textTransform: 'uppercase',
    color: '#837777'
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  nextButton: {
    marginTop: verticalScale(30)
  },
});
