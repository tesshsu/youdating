import { StyleSheet } from 'react-native';

import { verticalScale, scale, moderateScale } from '../../../../Helpers/ScaleHelper';

export const HEADER_HEIGHT = verticalScale(400);

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT
  },
  bottomOffsetView: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    bottom: 0,
    left: 0,
    right: 0
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    backgroundColor: 'black'
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: 'cover'
  },
  mask: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 1)',
    height: HEADER_HEIGHT
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  headerTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
  bouttomTextContainer: {
    justifyContent: 'flex-end'
  },
  headerInner: {
    marginLeft: scale(30),
    marginRight: scale(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfosContainer: {
    position: 'absolute',
    left: scale(10),
    alignItems: 'flex-start'
  },
  firstNameText: {
    fontFamily: 'Gadugi-Bold',
    fontSize: moderateScale(21),
    lineHeight: 0,
    fontWeight: 'bold',
    color: 'white',
    flexGrow: 0,
    textTransform: 'uppercase',
    textShadowColor: 'black',
    textShadowRadius: 3,
    textShadowOffset: { width: 0, height: 0 },
    elevation: 2
  },
  profilTypeText: {
    fontFamily: 'Gadugi-Bold',
    fontSize: moderateScale(25),
    lineHeight: 0,
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'uppercase',
    textShadowColor: 'black',
    textShadowRadius: 3,
    textShadowOffset: { width: 0, height: 0 },
    elevation: 2
  },
  personalityText: {
    fontFamily: 'Gadugi-Bold',
    fontSize: moderateScale(18),
    lineHeight: 0,
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'uppercase',
    textShadowColor: 'black',
    textShadowRadius: 3,
    textShadowOffset: { width: 0, height: 0 },
    elevation: 2
  }
});
