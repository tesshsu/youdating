import React from 'react';
import { Text, View } from 'react-native';
import Button from '../Button';
import styles from './styles';
import { moderateScale } from '../../../Helpers/ScaleHelper';
import NavigationHelper from '../../../Helpers/NavigationHelper';
import { verticalScale } from '../../../Helpers/ScaleHelper';
export default function NoResults() {
  return (
    <View style={styles.empty}>
      <Text style={styles.emptyText}>
        { /* eslint-disable-next-line jsx-a11y/accessible-emoji */ }
        <Text style={{ fontSize: moderateScale(30) }}>😢</Text>
        {"\n\nAucun résultat\nne vous n'aviez pas encore commencer à votre recherche"}
      </Text>
	  <Button
        text={'RECHERCHER LES AUTRES'}
        size={verticalScale(50)}
        onPress={() => NavigationHelper.navigate('MainTabsProfilSearch')}
      />
    </View>
  );
}
