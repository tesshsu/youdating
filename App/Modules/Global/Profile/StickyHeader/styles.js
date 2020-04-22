import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../../Helpers/ScaleHelper';

import { MOOD_SELECTOR_HEIGHT } from '../../MoodSelector/styles';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2
    },
    transform: [{ translateY: -1000 }],
    elevation: 2
  },
  innerContainer: {
    paddingHorizontal: scale(30),
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(20) + (MOOD_SELECTOR_HEIGHT / 2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  userInfos: {
    flex: 1,
    marginLeft: scale(20)
  },
  usernameText: {
    fontFamily: 'Segoe-UI-Bold',
    fontSize: moderateScale(20),
    textTransform: 'uppercase'
  },
  personnalityText: {
    fontFamily: 'Segoe-UI-Regular',
    fontSize: moderateScale(18),
    color: 'black',
    textTransform: 'uppercase'
  },
  moodSelectorContainer: {
    position: 'absolute',
    bottom: -(MOOD_SELECTOR_HEIGHT / 2),
    left: 0,
    right: 0,
    overflow: 'visible',
    alignItems: 'center'
  },
  shadow: {
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2
    },
    borderRadius: verticalScale(50),
  },
  moodSelector: {
    marginTop: 0,
    marginBottom: 0,
    overflow: 'visible'
  }
});
