import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  View, SafeAreaView, Text, Dimensions
} from 'react-native';
import Animated from 'react-native-reanimated';
import { Image } from 'react-native-expo-image-cache';

import { SharedElement } from 'react-navigation-shared-element';
import styles, { HEADER_HEIGHT } from './styles';
import { verticalScale, scale } from '../../../../Helpers/ScaleHelper';
import useCurrentMood from '../../../../Hooks/useCurrentMood';
import ButtonsColumn from './ButtonsColumn';

const { width: WINDOW_WIDTH } = Dimensions.get('window');

const {
  interpolate,
  Extrapolate
} = Animated;

export default function Header(props) {
  const {
    scrollY,
    imageSource,
    TopLeftComponent,
    TopCenterComponent,
    TopRightComponent,
    leftColumnActions,
    rightColumnActions,
    firstName,
    personnality,
    subPersonnality
  } = props;

  const [bottomOffset, setBottomOffset] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [usernameWidth, setUsernameWidth] = useState(0);
  const { moodInfos } = useCurrentMood();

  const imageHeight = interpolate(scrollY, {
    inputRange: [-100, HEADER_HEIGHT],
    outputRange: [HEADER_HEIGHT + 100, 0],
    extrapolateRight: Extrapolate.CLAMP
  });

  const maskOpacity = interpolate(scrollY, {
    inputRange: [0, HEADER_HEIGHT - (HEADER_HEIGHT / 3)],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP
  });

  const headerTranslateY = interpolate(scrollY, {
    inputRange: [HEADER_HEIGHT - verticalScale(130), HEADER_HEIGHT],
    outputRange: [0, -(headerHeight + verticalScale(60))],
    extrapolate: Extrapolate.CLAMP
  });

  const usernameInfosTranslateY = interpolate(scrollY, {
    inputRange: [verticalScale(40), HEADER_HEIGHT],
    outputRange: [0, -(HEADER_HEIGHT - verticalScale(30))],
    extrapolateLeft: Extrapolate.CLAMP
  });

  const usernameInfosTranslateX = interpolate(scrollY, {
    inputRange: [verticalScale(40), verticalScale(80)],
    outputRange: [0, (WINDOW_WIDTH / 2) - (usernameWidth / 2) - scale(10)],
    extrapolate: Extrapolate.CLAMP
  });

  const personnalityOpacity = interpolate(scrollY, {
    inputRange: [0, verticalScale(30)],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP
  });

  const buttonsOpacity = interpolate(scrollY, {
    inputRange: [HEADER_HEIGHT - verticalScale(150), HEADER_HEIGHT - verticalScale(130)],
    outputRange: [1, 0],
    extrapolateLeft: Extrapolate.CLAMP
  });

  function getBottomOffset(ev) {
    const { height: viewHeight } = ev.nativeEvent.layout;

    setBottomOffset(viewHeight);
  }

  function onHeaderLayout(ev) {
    const { height } = ev.nativeEvent.layout;

    if (height > headerHeight) {
      setHeaderHeight(height);
    }
  }

  return (
    <>
      { !bottomOffset && <View style={styles.bottomOffsetView} onLayout={getBottomOffset} /> }
      <SharedElement key={imageSource} id={imageSource}>
        <Animated.View style={[styles.imageContainer, { height: imageHeight }]}>
          <Image style={styles.image} uri={imageSource} />
        </Animated.View>
      </SharedElement>
      <Animated.View
        style={[
          styles.mask, {
            opacity: maskOpacity,
            height: imageHeight,
            backgroundColor: moodInfos.color
          }]}
      />
      <Animated.View
        onLayout={onHeaderLayout}
        style={[
          styles.header, {
            transform: [
              { translateY: headerTranslateY }
            ]
          }]}
      >
        <SafeAreaView />
        <View style={styles.headerInner}>
          <Animated.View style={{ opacity: buttonsOpacity }}>
            { TopLeftComponent }
          </Animated.View>
          <View style={styles.headerTextContainer}>
            { TopCenterComponent }
          </View>
          <Animated.View style={{ opacity: buttonsOpacity }}>
            { TopRightComponent }
          </Animated.View>
        </View>
      </Animated.View>
      { bottomOffset > 0 && (
        <ButtonsColumn
          scrollY={scrollY}
          containerStyle={{
            left: scale(10),
            top: verticalScale(80),
            zIndex: 10000
          }}
        >
          { leftColumnActions }
        </ButtonsColumn>
      )}
      { bottomOffset > 0 && (
        <ButtonsColumn
          scrollY={scrollY}
          right
          containerStyle={{
            right: scale(10),
            bottom: bottomOffset + verticalScale(40),
            zIndex: 10000
          }}
        >
          { rightColumnActions }
        </ButtonsColumn>
      )}
      { bottomOffset > 0 && (
        <Animated.View
          style={[
            styles.userInfosContainer,
            {
              bottom: bottomOffset + verticalScale(20),
              transform: [
                {
                  translateY: usernameInfosTranslateY,
                  translateX: usernameInfosTranslateX
                },
              ]
            }
          ]}
        >
          <Text
            onLayout={({
              nativeEvent: {
                layout: {
                  width
                }
              }
            }) => setUsernameWidth(width)}
            style={styles.firstNameText}
          >
            {firstName}
          </Text>
          <Animated.Text
            style={[
              styles.profilTypeText,
              {
                color: moodInfos.color,
                opacity: personnalityOpacity
              }
            ]}
          >
            {personnality}
          </Animated.Text>
          <Animated.Text
            style={[
              styles.personalityText,
              {
                opacity: personnalityOpacity
              }
            ]}
          >
            {subPersonnality}
          </Animated.Text>
        </Animated.View>
      )}
    </>
  );
}

Header.defaultProps = {
  TopLeftComponent: null,
  TopCenterComponent: null,
  TopRightComponent: null,
  leftColumnActions: [],
  rightColumnActions: []
};

Header.propTypes = {
  scrollY: PropTypes.instanceOf(Animated.Value).isRequired,
  imageSource: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.shape({
      uri: PropTypes.string.isRequired
    })
  ]).isRequired,
  TopLeftComponent: PropTypes.element,
  TopCenterComponent: PropTypes.element,
  TopRightComponent: PropTypes.element,
  leftColumnActions: PropTypes.arrayOf(PropTypes.element),
  rightColumnActions: PropTypes.arrayOf(PropTypes.element),
  firstName: PropTypes.string.isRequired,
  personnality: PropTypes.string.isRequired,
  subPersonnality: PropTypes.string.isRequired
};
