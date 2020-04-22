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
  Alert,
} from 'react-native';

import styles from './styles';
import useCurrentMood from '../../../../Hooks/useCurrentMood';
import useModal from '../../../../Hooks/useModal';
import useLogguedUser from '../../../../Hooks/useLogguedUser';

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

export default function QuerySelectorModal() {
  const { currentMood, moodInfos } = useCurrentMood();
  const { logguedUser, updateQueryAndTag } = useLogguedUser();
  const { isOpen, closeModal } = useModal('querySelector');

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

  const handlePress = async (query) => {
    exit();
    if (query !== logguedUser.moods[currentMood].query) {
      try {
        await updateQueryAndTag(currentMood, {
          query: query ? query.label : null,
          tag: query ? query.tags[0] : null
        });
      } catch (err) {
        Alert.alert(
          'Erreur',
          'Une erreur est survenue lors de la mise à jour de la recherche!'
        );
      }
    }
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
            { moodInfos.searches.map((s, index) => (
              <TouchableOpacity
                key={index.toString()}
                style={[
                  styles.moodButton,
                ]}
                onPress={() => handlePress(s)}
              >
                <Text
                  style={[
                    styles.moodButtonText,
                    { color: moodInfos.color }
                  ]}
                >
                  { s.label }
                </Text>
              </TouchableOpacity>
            ))}
          </SafeAreaView>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}
