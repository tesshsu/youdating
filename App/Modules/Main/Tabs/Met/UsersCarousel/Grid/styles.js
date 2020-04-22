import { StyleSheet, Dimensions } from 'react-native';

import { verticalScale, scale } from '../../../../../../Helpers/ScaleHelper';

const SCREEN_WIDTH = Dimensions.get('screen').width;

export default StyleSheet.create({
  sectionTitleContainer: {
    marginTop: verticalScale(17),
    marginHorizontal: scale(30)
  },
  container: {
    justifyContent: 'space-between',
    height: '100%',
    width: SCREEN_WIDTH
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(17),
    marginHorizontal: scale(30),
  },
  fill: {
    flex: 1
  },
  scrollViewContent: {
    paddingTop: verticalScale(15),
    paddingBottom: verticalScale(15)
  },
  card: {
    width: scale(154),
  },
});
