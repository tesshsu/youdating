import { StyleSheet } from 'react-native';
import { verticalScale, moderateScale, scale } from '../../../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  section: {
    marginTop: verticalScale(45),
  },
  title: {
    fontFamily: 'NewTaiLue-Bold',
    fontSize: moderateScale(16),
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  assetsRow: {
    marginTop: verticalScale(30),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  assetText: {
    fontFamily: 'NewTaiLue-Regular',
    fontSize: moderateScale(15),
    marginBottom: verticalScale(12),
    color: '#B0ABAB'
  },
  lifeStyleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(13)
  },
  lifeStyleText: {
    marginLeft: scale(17),
    fontFamily: 'NewTaiLue-Bold',
    fontSize: moderateScale(16),
    color: '#BBBABA'
  },
  sliderContainer: {
    marginTop: verticalScale(18),
    marginBottom: verticalScale(15)
  },
  slider: {
    alignSelf: 'center',
  },
  sliderLabelText: {
    fontFamily: 'NewTaiLue-Regular',
    fontSize: moderateScale(15),
    color: '#868686',
    textAlign: 'left',
    marginTop: verticalScale(10),
    marginBottom: verticalScale(2),
    marginLeft: scale(12)
  },
  descriptionContainer: {
    marginTop: verticalScale(0),
    marginHorizontal: scale(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionText: {
    fontFamily: 'NewTaiLue-Regular',
    fontSize: moderateScale(18),
    textAlign: 'center',
    color: '#BBBABA',
  },
  itemStyle: {
    flex: 1,
    minWidth: 92,
    maxWidth: 92,
    width: 92,
    height: 120,
    minHeight: 120,
    maxHeight: 120,
    margin: 5,
    backgroundColor: '#ccc'
  }
});
