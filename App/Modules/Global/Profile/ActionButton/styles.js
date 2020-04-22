import { StyleSheet } from 'react-native';

import { scale, verticalScale, moderateScale } from '../../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  button: {
    marginTop: verticalScale(14),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(4),
    shadowColor: 'black',
    shadowRadius: scale(4),
    shadowOffset: { width: 0, height: 1 },
    elevation: 2
  },
  text: {
    fontFamily: 'NewTaiLue-Regular',
    fontSize: moderateScale(10),
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textShadowColor: 'black',
    textShadowRadius: verticalScale(2),
    shadowOffset: { width: 0, height: 1 },
    elevation: 2
  }
});
