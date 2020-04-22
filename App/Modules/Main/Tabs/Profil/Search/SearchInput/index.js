import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';
import {
  TouchableOpacity,
  TextInput
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import styles from './styles';
import useSearch from '../../../../../../Hooks/useSearch';
import useCurrentMood from '../../../../../../Hooks/useCurrentMood';
import { scale } from '../../../../../../Helpers/ScaleHelper';

export default function SearchInput() {
  const inputRef = useRef();
  const [isFocused, setIsFocused] = useState(false);
  const { moodInfos } = useCurrentMood();
  const {
    searchTerm,
    category,
    setSearchTerm,
  } = useSearch();

  const focusInput = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  function handleFocus() {
    setIsFocused(true);
  }

  function handleBlur() {
    setIsFocused(false);
  }

  function getPlaceholder() {
    if (category === 'USERS') {
      return 'NOM D\'UTILISATEUR';
    }

    if (category === 'HASH') {
      return 'HASHTAG';
    }

    return 'LOCALITÉ';
  }

  useEffect(() => {
    if (isFocused) {
      focusInput();
    }
  }, [isFocused, focusInput, category, setSearchTerm]);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isFocused && {
          borderColor: moodInfos.color,
          backgroundColor: 'white'
        }
      ]}
      onPress={focusInput}
    >
      <Feather
        name="search"
        color={isFocused ? moodInfos.color : '#AAAAAA'}
        size={scale(18)}
      />
      <TextInput
        ref={inputRef}
        style={[
          styles.input,
          isFocused && { color: moodInfos.color }
        ]}
        value={searchTerm}
        keyboardType="default"
        autoCapitalize={category === 'HASH' ? 'characters' : 'words'}
        placeholderTextColor="#AAAAAA"
        placeholder={`RECHERCHER PAR ${getPlaceholder()}`}
        onChangeText={setSearchTerm}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </TouchableOpacity>
  );
}
