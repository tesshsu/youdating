import { StyleSheet } from 'react-native';
import { scale } from '../../../../../../Helpers/ScaleHelper';

const IMAGE_WIDTH = scale(100);
const IMAGE_HEIGHT = IMAGE_WIDTH / 4 * 3;

export default StyleSheet.create({
  imageBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderColor: 'transparent',
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    resizeMode: 'cover',
  }
});
