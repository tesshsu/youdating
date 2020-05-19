import React from 'react';
import {
  KeyboardAvoidingView,
  Text,
  View
} from 'react-native';

import styles from './styles';
import * as Slides from './Slides';
import Carousel from '../../Global/Carousel';
import NavigationHelper from '../../../Helpers/NavigationHelper';
import { LinearGradient } from 'expo-linear-gradient';


export default function PostSignUpIntro() {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <Carousel>
        { Object.values(Slides).map((Slide, i) => (
          <View key={i.toString()} style={styles.slideWrapper}>
            <Slide key={i.toString()} />
          </View>
        ))}
      </Carousel>
    </KeyboardAvoidingView>
  );
}
