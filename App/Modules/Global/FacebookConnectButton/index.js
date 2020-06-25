import React from 'react';
import {
  Text,
  TouchableOpacity,
  ViewPropTypes,
  Alert
} from 'react-native';

import styles from './styles';
import useLogguedUser from '../../../Hooks/useLogguedUser';

export default function FacebookConnectButton(props) {
  const {
    signInUsingFacebook,
  } = useLogguedUser();

  const {
    containerStyle
  } = props;

  async function facebookConnect() {
    try {
      await signInUsingFacebook();
    } catch (err) {
      Alert.alert(
        'Connexion error',
        err
      );
    }
  }

  return (
    <TouchableOpacity
      style={[
        styles.button,
        containerStyle
      ]}
      onPress={facebookConnect}
    >
      <Text style={styles.buttonText}>
        Connexion via facebook
      </Text>
    </TouchableOpacity>
  );
}

FacebookConnectButton.propTypes = {
  containerStyle: ViewPropTypes.style
};

FacebookConnectButton.defaultProps = {
  containerStyle: {}
};
