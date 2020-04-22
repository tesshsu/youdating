import { StyleSheet } from 'react-native';
import { verticalScale, scale, moderateScale } from '../../../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#E2E2E2',
  },
  scrollViewContent: {
    paddingVertical: verticalScale(20)
  },
  textInputContainer: {
    backgroundColor: 'white',
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(6),
    marginBottom: verticalScale(20)
  },
  titleText: {
    fontFamily: 'NewTaiLue-Bold',
    fontSize: moderateScale(14),
    textTransform: 'uppercase',
    marginLeft: scale(30),
    marginBottom: verticalScale(10)
  },
  input: {
    width: '100%',
    fontFamily: 'NewTaiLue-Regular',
    color: 'black',
    paddingHorizontal: scale(30),
    fontSize: moderateScale(14),
    marginBottom: verticalScale(5)
  },
  remainingCharactersText: {
    fontFamily: 'NewTaiLue-Regular',
    color: 'black',
    fontSize: moderateScale(12),
    paddingHorizontal: verticalScale(30),
    textAlign: 'right'
  }
});
