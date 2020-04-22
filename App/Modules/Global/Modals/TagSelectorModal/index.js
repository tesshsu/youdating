import React, {
  useRef,
  useCallback,
  useLayoutEffect
} from 'react';
import {
  Modal,
  Text,
  SafeAreaView,
  Animated,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';

import styles from './styles';
import useCurrentMood from '../../../../Hooks/useCurrentMood';
import useModal from '../../../../Hooks/useModal';
import useLogguedUser from '../../../../Hooks/useLogguedUser';

export default function TagSelectorModal() {
  const { currentMood, moodInfos } = useCurrentMood();
  const { logguedUser, updateTag } = useLogguedUser();
  const { isOpen, closeModal } = useModal('tagSelector');

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

  const handlePress = async (tag) => {
    exit();
    if (tag !== logguedUser.moods[currentMood].tag) {
      try {
        await updateTag(currentMood, tag);
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

  const { query } = logguedUser.moods[currentMood];
  const { tags } = moodInfos.searches.find(s => s.label === query);

  return (
    <Modal visible transparent>
      <Animated.View style={[styles.mask, { opacity }]}>
        <TouchableOpacity onPress={exit} style={styles.pressOutside} />
        <Animated.View
          style={[
            styles.menuContainer,
            {
              opacity,
              transform: [{ translateY }]
            }
          ]}
        >
          <SafeAreaView>
            <ScrollView>
              { tags.map((t, index) => (
                <TouchableOpacity
                  key={t}
                  style={[
                    styles.moodButton,
                    !index && { borderTopWidth: 0 }
                  ]}
                  onPress={() => handlePress(t)}
                >
                  <Text
                    style={[
                      styles.moodButtonText,
                      { color: moodInfos.color }
                    ]}
                  >
                    {`#${t}`}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </SafeAreaView>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}
