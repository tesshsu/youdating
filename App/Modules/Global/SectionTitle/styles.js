import { StyleSheet } from 'react-native';
import { scale } from '../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bar: {
    flex: 1,
    height: 1,
    backgroundColor: '#AAAAAA'
  },
  text: {
    marginHorizontal: scale(18),
    fontFamily: 'NewTaiLue-Regular',
    fontSize: 12,
    color: '#666565'
  }
});
