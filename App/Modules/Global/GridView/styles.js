import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale, scale } from '../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  image: {
    width: '100%',
    height: '80%',
    borderRadius: 2,
    zIndex: -9,
  },
  checkbox: {
    zIndex: 9999,
    top: '-20%',
    margin: 0,
    padding: 0,
    color: '#fff'
  },
  listStyle: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
