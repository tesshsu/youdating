import { StyleSheet } from 'react-native';

import { scale } from '../../../../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontFamily: 'NewTaiLue-Bold',
    textAlign: 'center',
    marginTop: 6,
    fontSize: scale(14)
  }
});
