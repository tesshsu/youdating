import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import Animated from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';
import { useValues } from 'react-native-redash';
import { ScreenOrientation } from 'expo';
import { NavigationEvents } from 'react-navigation';
import { SharedElement } from 'react-navigation-shared-element';

import styles, { WINDOW_WIDTH } from './styles';
import { verticalScale } from '../../../Helpers/ScaleHelper';
import NavigationHelper from '../../../Helpers/NavigationHelper';
import Swipeable from './Swipeable';
import PinchToZoom from './PinchToZoom';

export default function PhotosGallerie({ navigation }) {
  const initialOffset = (navigation.getParam('initialIndex') + 1) * -WINDOW_WIDTH;
  const photos = navigation.getParam('photos');
  const [translateX, offsetX, isScrolling] = useValues([0, initialOffset, 0], []);

  const snapPoints = [0, 1, ...photos].map((_, i) => i * -WINDOW_WIDTH);

  function onSnap([position]) {
    const xOffset = -WINDOW_WIDTH;
    if (position === 0) {
      offsetX.setValue(photos.length * xOffset);
      navigation.setParams({ currentPhoto: photos[photos.length - 1] });
    } else if (position === (photos.length + 1) * xOffset) {
      offsetX.setValue(xOffset);
      navigation.setParams({ currentPhoto: photos[0] });
    } else {
      const currentIndex = Math.abs(position / WINDOW_WIDTH) - 1;
      navigation.setParams({ currentPhoto: photos[currentIndex] });
    }
  }

  function onWillGoBack() {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  }

  return (
    <>
      <NavigationEvents
        onWillBlur={onWillGoBack}
      />
      <View style={styles.container}>
        <Swipeable
          translateX={translateX}
          offset={offsetX}
          snapPoints={snapPoints}
          onSnap={onSnap}
          isScrolling={isScrolling}
        >
          <Animated.View
            style={[
              styles.gallery,
              {
                transform: [{ translateX }]
              }
            ]}
          >
            <View style={[styles.imageContainer, { width: WINDOW_WIDTH }]}>
              <Image
                uri={photos[photos.length - 1]}
                style={[styles.image]}
              />
            </View>
            { photos.map(p => (
              <PinchToZoom>
                <SharedElement id={p} backgroundColor="black">
                  <Image
                    uri={p}
                    style={[styles.image]}
                  />
                </SharedElement>
              </PinchToZoom>
            ))}
            <View style={[styles.imageContainer, { width: WINDOW_WIDTH }]}>
              <Image
                uri={photos[0]}
                style={[styles.image]}
              />
            </View>
          </Animated.View>
        </Swipeable>
      </View>
      <View style={styles.header}>
        <SafeAreaView />
        <View style={styles.headerContent}>
          <Feather
            name="chevron-left"
            color="white"
            size={verticalScale(30)}
            onPress={NavigationHelper.back}
          />
        </View>
      </View>
    </>
  );
}

PhotosGallerie.sharedElements = (navigation,) => {
  const photo = navigation.getParam('currentPhoto');
  return [photo];
};
