import { StyleSheet } from 'react-native';

import { scale, verticalScale } from '../../../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  draggerContainer: {
    paddingTop: verticalScale(5),
    paddingBottom: verticalScale(18),
    alignItems: 'center',
  },
  dragger: {
    width: scale(72),
    height: verticalScale(7),
    borderRadius: verticalScale(4),
    backgroundColor: '#E2E1E1'
  },
  conversationTitleText: {
    fontFamily: 'Segoe-UI-Bold',
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginTop: verticalScale(7),
    marginBottom: verticalScale(15)
  },
  dateText: {
    fontFamily: 'Segoe-UI-Bold',
    textAlign: 'center',
    fontSize: 13,
    color: '#9C9999',
  },
  timeText: {
    fontFamily: 'Segoe-UI-Regular',
    textAlign: 'center',
    fontSize: 13,
    marginBottom: verticalScale(20)
  },
  scrollViewContent: {
    paddingTop: verticalScale(0),
  },
  bubbleTarget: {
    alignSelf: 'flex-start',
    marginLeft: scale(70)
  },
  bubbleAuthor: {
    alignSelf: 'flex-end',
    marginRight: scale(10)
  },
});
