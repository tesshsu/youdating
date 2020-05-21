import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  compatibilityResult: {
    flex: 1,
    marginHorizontal: scale(30),
    borderTopColor: '#DFDFDF',
    borderTopWidth: 1,
    paddingTop: verticalScale(17.5),
    justifyContent: 'space-between'
  },
  resultTitleText: {
    fontFamily: 'Segoe-UI-Bold',
    fontSize: moderateScale(15),
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  resultText: {
    fontFamily: 'Segoe-UI-Bold',
    fontSize: moderateScale(14),
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  resultBodyText: {
    fontFamily: 'NewTaiLue-Regular',
    fontSize: moderateScale(14),
    textAlign: 'center',
    color: '#898888',
  },
  userContainer: {
    alignItems: 'center'
  },
  imageBackground: {
    width: scale(270),
    height: verticalScale(253),
    borderRadius: verticalScale(8),
  },
  imageBackgroundImage: {
    borderRadius: verticalScale(65)
  },
  bigAvatarPart: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    marginTop: 20
  }
});
