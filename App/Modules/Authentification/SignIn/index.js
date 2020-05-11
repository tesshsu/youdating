import React, { useEffect } from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { Formik } from 'formik';
import { LinearGradient } from 'expo-linear-gradient';

import styles from './styles';
import NavigationHelper from '../../../Helpers/NavigationHelper';
import useLogguedUser from '../../../Hooks/useLogguedUser';
import AuthentificationButton from '../../Global/AuthentificationButton';
import FacebookConnectButton from '../../Global/FacebookConnectButton';
import TextField from '../../Global/TextField';
import Images from '../../../Assets/images';

export default function AuthentificationSignIn() {
  const {
    signIn,
    isAuthentificated,
    logguedUser
  } = useLogguedUser();

  useEffect(() => {
    if (isAuthentificated && logguedUser) {
      const { quizzCompleted } = logguedUser;
      NavigationHelper.navigate(quizzCompleted ? 'MainNavigator' : 'PostSignUpIntro');
    }
  }, [isAuthentificated, logguedUser]);

  return (
    <Formik
      initialValues={{
        email: 'laristo1@hotmail.fr',
        password: 'Keinanoam24$'
      }}
      onSubmit={async ({ email, password }) => {
        try {
          await signIn(
            email.trim(),
            password.trim()
          );
        } catch (err) {
          Alert.alert('Authentification', 'Identifiants incorrects');
        }
      }}
    >
      { ({ handleChange, handleSubmit, values }) => (
        <View style={styles.scrollViewContainer} >
          <View style={styles.backgroundContainer}>
            <Image style={styles.bakcgroundImage} source={Images.back_img_signIn} />
          </View>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.content}
          >
            <Text style={styles.subTitleText}>{'Bonjour\nBienvenue sur You\'s'}</Text>
            <FacebookConnectButton />
            <View style={styles.or}>
              <View style={styles.bar} />
              <Text style={styles.orText}>ou</Text>
              <View style={styles.bar} />
            </View>
            <TextField
              containerStyle={styles.textField}
              label="ADRESS EMAIL"
              textInputProps={{
                autoCapitalize: 'none',
                placeholder: 'email',
                keyboardType: 'email-address',
                textContentType: 'emailAddress',
                onChangeText: handleChange('email'),
                value: values.email,
              }}
            />
            <TextField
              containerStyle={styles.textField}
              label="MOT DE PASSE"
              textInputProps={{
                autoCapitalize: 'none',
                placeholder: 'mot de passe',
                onChangeText: handleChange('password'),
                value: values.password,
                secureTextEntry: true,
              }}
            />
            <TouchableOpacity
              style={styles.link}
              onPress={() => NavigationHelper.navigate('ForgetPassword')}
            >
              <Text style={styles.linkText}>
                mot de pass oublie
              </Text>
            </TouchableOpacity>
            <AuthentificationButton
              text="LOGIN"
              containerStyle={styles.submitButton}
              onPress={handleSubmit}
            />
            <TouchableOpacity
              style={styles.link}
              onPress={() => NavigationHelper.navigate('AuthentificationSignUp')}
            >
              <Text style={styles.linkText}>
                SIGN UP
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}
    </Formik>
  );
}
