import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  mask: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
    opacity: 1
  },
  pressOutside: {
    flex: 1,
  },
  menuContainer: {
    marginHorizontal: scale(10),
    borderTopLeftRadius: verticalScale(17),
    borderTopRightRadius: verticalScale(17),
    backgroundColor: 'white',
    transform: [
      { translateY: 0 }
    ]
  },
  moodButton: {
    paddingVertical: verticalScale(30),
    paddingHorizontal: scale(27.5),
    borderTopColor: '#CFC7C7',
    borderTopWidth: 1
  },
  moodButtonText: {
    textAlign: 'center',
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    textTransform: 'uppercase'
  }
});
