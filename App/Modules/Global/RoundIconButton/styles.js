import { StyleSheet } from 'react-native';
import { verticalScale } from '../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  button: {
    alignSelf: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.33,
    shadowRadius: 3,
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: verticalScale(3) },
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(5)
  }
});
