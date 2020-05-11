import { StyleSheet } from 'react-native';
import { scale, verticalScale } from '../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  button: {
    width: scale(254),
    height: verticalScale(44),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: verticalScale(23),
    borderColor: '#d412c7',
    borderWidth: 2,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    alignSelf: 'center'
  },
  buttonText: {
    color: '#d412c7',
    textAlign: 'center',
    textTransform: 'uppercase',
  }
});
