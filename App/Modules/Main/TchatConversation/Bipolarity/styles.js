import { StyleSheet } from 'react-native';
import { verticalScale, scale, moderateScale } from '../../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: verticalScale(24),
    alignItems: 'center'
  },
  imageBackground: {
    width: scale(335),
    height: verticalScale(204),
    marginBottom: verticalScale(8)
  },
  imageLabelText: {
    fontFamily: 'Segoe-UI-Regular',
    fontSize: moderateScale(21),
    textTransform: 'uppercase',
    color: '#BDBDBD',
    textAlign: 'center'
  },
  imageBackgroundImage: {
    width: scale(335),
    height: verticalScale(204),
    marginTop: verticalScale(10)
  },
  moodTitleText: {
    textAlign: 'center',
    fontFamily: 'Segoe-UI-Regular',
    textTransform: 'uppercase',
    fontSize: moderateScale(19),
    marginBottom: verticalScale(18),
  },
  questionText: {
    fontFamily: 'Segoe-UI-Bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    marginVertical: verticalScale(10)
  },
  text: {
    fontFamily: 'Segoe-UI-Regular',
    textTransform: 'uppercase',
    color: '#7D7D7D',
    marginBottom: verticalScale(23)
  },
  line: {
    height: 1,
    backgroundColor: '#fff',
    marginTop: verticalScale(23)
  }
});
