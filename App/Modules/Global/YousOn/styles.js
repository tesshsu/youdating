import { StyleSheet } from 'react-native';
import { scale } from '../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  container: {
    position: 'relative',
    alignSelf: 'flex-start'
  },
  badge: {
    width: scale(6),
    height: scale(6),
    borderRadius: scale(3),
    position: 'absolute',
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOffset: { y: 0, x: 0 },
    elevation: 2
  }
});
