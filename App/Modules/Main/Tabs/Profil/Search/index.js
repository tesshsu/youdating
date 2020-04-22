import React from 'react';
import { View, KeyboardAvoidingView } from 'react-native';

import styles from './styles';
import PageHeader from '../../../../Global/PageHeader';
import MoodSelector from '../../../../Global/MoodSelector';
import SearchCategorySelector from './SearchCategorySelector';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';
import { verticalScale } from '../../../../../Helpers/ScaleHelper';

export default function Search() {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={verticalScale(0)}
    >
      <PageHeader
        title="Recherche"
        backButton
      />
      <MoodSelector />
      <View style={styles.searchCategoriesContainer}>
        <SearchCategorySelector
          iconName="user"
          categoryName="USERS"
          label="utilisateurs"
        />
        <SearchCategorySelector
          iconName="hash"
          categoryName="HASH"
          label="hashtag"
        />
        <SearchCategorySelector
          iconName="map-pin"
          categoryName="LOCALITY"
          label="localité"
        />
      </View>
      <SearchInput />
      <SearchResults />
    </KeyboardAvoidingView>
  );
}
