import { StyleSheet } from 'react-native';
import { scale, verticalScale } from '../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  button: {
    width: scale(254),
    height: verticalScale(44),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: verticalScale(23),
    borderColor: '#4A6EA8',
    borderWidth: 1,
    backgroundColor: 'white',
    alignSelf: 'center'
  },
  buttonText: {
    color: '#4A6EA8',
    textAlign: 'center',
    textTransform: 'uppercase',
  }
});
