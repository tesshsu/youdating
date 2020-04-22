import React from 'react';
import {
  View
} from 'react-native';

import styles from './styles';
import * as Slides from './Slides';
import Carousel from '../../Global/Carousel';


export default function PostSignUpIntro() {
  return (
    <Carousel>
      { Object.values(Slides).map((Slide, i) => (
        <View key={i.toString()} style={styles.slideWrapper}>
          <Slide key={i.toString()} />
        </View>
      ))}
    </Carousel>
  );
}
