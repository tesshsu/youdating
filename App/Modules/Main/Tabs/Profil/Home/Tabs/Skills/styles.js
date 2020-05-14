import { StyleSheet } from 'react-native';
import { verticalScale, moderateScale, scale } from '../../../../../../../Helpers/ScaleHelper';

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
  descriptionContainer: {
    marginHorizontal: verticalScale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionText: {
    fontFamily: 'NewTaiLue-Regular',
    fontSize: moderateScale(18),
    textAlign: 'center',
    color: '#BBBABA',
  },
  avatarContainer: {
    padding: scale(3),
    marginBottom: verticalScale(3),
    marginLeft: scale(2),
    marginRight: scale(2)
  },
  imageBackground: {
    height: verticalScale(64),
    width: scale(100)
  }
});
