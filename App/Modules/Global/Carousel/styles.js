import {
  StyleSheet,
  Dimensions
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('screen').width;

export default StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    width: SCREEN_WIDTH
  },
  innerContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    overflow: 'hidden'
  }
});
