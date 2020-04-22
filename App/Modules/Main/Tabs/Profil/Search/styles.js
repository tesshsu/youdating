import { StyleSheet } from 'react-native';
import { scale } from '../../../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  searchCategoriesContainer: {
    width: scale(263),
    marginTop: 7,
    marginBottom: 21,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between'
  }
});
