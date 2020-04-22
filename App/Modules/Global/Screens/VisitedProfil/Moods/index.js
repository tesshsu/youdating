import React from 'react';
import {
  Text,
  View
} from 'react-native';

import MoodSelector from '../../../MoodSelector';

import styles from './styles';
import ImageHolder from './ImageHolder';
import useLogguedUser from '../../../../../Hooks/useLogguedUser';

export default function Moods() {
  const { logguedUser } = useLogguedUser();

  return (
    <>
      <MoodSelector />
      <Text style={styles.description}>
        RECHERCHE A CREE UNE COLLABORATION
      </Text>
      <Text style={styles.tag}>#MAKEUP</Text>
      <Text style={styles.text}>
        {'J\'aimerais crée un salon de cosmétique et je recherche quelqu\'un qui serait prêt à se lancer avec moi'}
      </Text>
      <View style={styles.imagesContainer}>
        { logguedUser.profilePhotos.map(p => (
          <ImageHolder
            containerStyle={styles.imageHolderContainer}
            key={p}
            imageUri={p}
          />
        ))
        }
        <ImageHolder containerStyle={styles.imageHolderContainer} />
      </View>
    </>
  );
}
