import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import styles from './styles';
import useCurrentMood from '../../../../../../Hooks/useCurrentMood';
import { scale } from '../../../../../../Helpers/ScaleHelper';
import useSearch from '../../../../../../Hooks/useSearch';

export default function SearchCategorySelector(props) {
  const { moodInfos } = useCurrentMood();
  const { category, setSearchCategory } = useSearch();

  const {
    iconName,
    label,
    categoryName
  } = props;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        setSearchCategory(categoryName);
      }}
    >
      <Feather
        name={iconName}
        size={scale(22)}
        color={category === categoryName ? moodInfos.color : '#AAAAAA'}
      />
      <Text
        style={[
          styles.text,
          { color: category === categoryName ? moodInfos.color : '#AAAAAA' }
        ]}
      >
        { label }
      </Text>
    </TouchableOpacity>
  );
}

SearchCategorySelector.propTypes = {
  iconName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  categoryName: PropTypes.string.isRequired
};
