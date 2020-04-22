import { StyleSheet, Dimensions } from 'react-native';
import { scale, verticalScale } from '../../../Helpers/ScaleHelper';

export const {
  width: WINDOW_WIDTH,
  height: WINDOW_HEIGHT
} = Dimensions.get('window');

const IMAGE_HEIGHT = WINDOW_WIDTH / 4 * 3;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    position: 'relative',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  headerContent: {
    flexDirection: 'row',
    paddingTop: verticalScale(10),
    paddingHorizontal: scale(20),
    justifyContent: 'space-between'
  },
  gallery: {
    position: 'absolute',
    flexDirection: 'row',
    overflow: 'visible',
    flexWrap: 'nowrap',
    backgroundColor: 'black'
  },
  imageContainer: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    resizeMode: 'cover',
    width: WINDOW_WIDTH,
    height: IMAGE_HEIGHT
  }
});
