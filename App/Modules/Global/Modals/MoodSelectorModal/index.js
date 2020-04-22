import React, {
  useRef,
  useCallback,
  useMemo,
  useLayoutEffect
} from 'react';
import {
  Modal,
  Text,
  SafeAreaView,
  Animated,
  TouchableOpacity,
  PanResponder,
} from 'react-native';

import styles from './styles';
import { MOODS } from '../../../../GlobalConfig';
import useCurrentMood from '../../../../Hooks/useCurrentMood';
import useModal from '../../../../Hooks/useModal';

function createPanResponder(translateY, animateModal, exit) {
  return PanResponder.create({
    onStartShouldSetPanResponder: () => false,
    onStartShouldSetPanResponderCapture: () => false,
    onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dy > 3,
    onPanResponderTerminationRequest: () => false,
    onPanResponderMove: Animated.event([null, { dy: translateY }]),
    onPanResponderRelease: (_, gestureState) => {
      if (Math.abs(gestureState.dy) > 150) {
        exit();
      } else {
        animateModal(1, 0);
      }
    },
    onPanResponderTerminate: () => {
      exit();
    },
    onShouldBlockNativeReponser: () => true
  });
}

export default function MoodSelectorModal() {
  const { currentMood, setCurrentMood } = useCurrentMood();
  const { isOpen, modalOptions, closeModal } = useModal('moodSelector');

  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(400)).current;

  const animateModal = useCallback((destOpacity, destTranslateY, cb) => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: destOpacity,
        duration: 400,
        useNativeDriver: true
      }),
      Animated.timing(translateY, {
        toValue: destTranslateY,
        duration: 400,
        useNativeDriver: true
      }),
    ]).start(cb);
  }, [opacity, translateY]);

  const exit = useCallback(() => animateModal(0, 400, closeModal), [animateModal, closeModal]);
  const panResponder = useMemo(() => createPanResponder(translateY, animateModal, exit), [
    translateY,
    animateModal,
    exit
  ]);

  const handlePress = (mood) => {
    if (mood !== currentMood) {
      setCurrentMood(mood);
    }

    exit();
  };

  useLayoutEffect(() => {
    if (isOpen) {
      animateModal(1, 0);
    }
  }, [animateModal, isOpen]);

  if (!isOpen) {
    return (null);
  }

  return (
    <Modal visible transparent>
      <Animated.View style={[styles.mask, { opacity }]}>
        <TouchableOpacity onPress={exit} style={styles.pressOutside} />
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.menuContainer,
            {
              opacity,
              transform: [{ translateY }]
            }
          ]}
        >
          <SafeAreaView>
            { modalOptions.moods.map((key, index) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.moodButton,
                  !index && { borderTopWidth: 0 }
                ]}
                onPress={() => handlePress(key)}
              >
                <Text
                  style={[
                    styles.moodButtonText,
                    { color: MOODS[key].color }
                  ]}
                >
                  { MOODS[key].title }
                </Text>
              </TouchableOpacity>
            ))}
          </SafeAreaView>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}
