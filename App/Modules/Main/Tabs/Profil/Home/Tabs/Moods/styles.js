import { StyleSheet } from 'react-native';

import { moderateScale, verticalScale, scale } from '../../../../../../../Helpers/ScaleHelper';

const IMAGE_WIDTH = scale(100);
const IMAGE_HEIGHT = IMAGE_WIDTH / 4 * 3;

export default StyleSheet.create({
  description: {
    fontFamily: 'NewTaiLue-Regular',
    fontSize: moderateScale(14),
    color: '#8F8C8C',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: verticalScale(10)
  },
  tag: {
    color: '#000000',
    fontFamily: 'NewTaiLue-Regular',
    fontSize: moderateScale(14),
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: verticalScale(17)
  },
  text: {
    fontFamily: 'NewTaiLue-Regular',
    fontSize: moderateScale(14),
    textAlign: 'center',
    color: '#8F8C8C',
    height: verticalScale(50),
    paddingHorizontal: scale(10),
    paddingVertical: 0,
    paddingTop: 0,
    paddingBottom: 0,
    borderColor: '#8F8C8C',
    borderRadius: verticalScale(15)
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: verticalScale(5),
    paddingHorizontal: verticalScale(10)
  },
  imagesContainer: {
    width: scale(324),
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: verticalScale(20)
  },
  imageHolderContainer: {
    marginVertical: verticalScale(4),
    marginHorizontal: verticalScale(2)
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    marginVertical: verticalScale(4),
    marginHorizontal: verticalScale(2),
    resizeMode: 'cover',
  },
  adInfosText: {
    fontFamily: 'NewTaiLue-Regular',
    fontSize: moderateScale(12),
    textAlign: 'center',
    color: 'black',
  },
  descriptionContainer: {
    marginHorizontal: scale(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionText: {
    fontFamily: 'NewTaiLue-Regular',
    fontSize: moderateScale(18),
    textAlign: 'center',
    color: '#BBBABA',
  }
});
