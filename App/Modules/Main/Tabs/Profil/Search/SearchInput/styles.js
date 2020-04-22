import { StyleSheet } from 'react-native';
import { scale, verticalScale } from '../../../../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: verticalScale(42),
    marginHorizontal: scale(11),
    backgroundColor: '#DCDCDC',
    borderColor: '#DCDCDC',
    borderWidth: 2,
    paddingHorizontal: scale(32.5),
    alignItems: 'center',
    borderRadius: 10
  },
  input: {
    flex: 1,
    marginLeft: scale(13),
    color: '#AAAAAA',
    fontFamily: 'Gadugi-Bold',
    fontSize: 14
  }
});
