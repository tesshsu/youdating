import React, { useEffect } from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image, Linking,
} from 'react-native';
import { Formik } from 'formik';
import { LinearGradient } from 'expo-linear-gradient';

import styles from './styles';
import globalStyles from '../styles';
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
        <View style={globalStyles.scrollViewContainer} >
          <View style={globalStyles.backgroundContainer}>
            <Image style={globalStyles.bakcgroundImage} source={Images.back_img_signIn} />
          </View>
          <ScrollView
            style={globalStyles.scrollView}
            contentContainerStyle={styles.content}
          >
            <Text style={globalStyles.subTitleText}>{'Bonjour\nBienvenue sur You\'s'}</Text>
            <FacebookConnectButton />
            <View style={globalStyles.or}>
              <View style={globalStyles.bar} />
              <Text style={globalStyles.orText}>ou</Text>
              <View style={globalStyles.bar} />
            </View>
            <TextField
              containerStyle={globalStyles.textField}
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
              containerStyle={globalStyles.textField}
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
              style={globalStyles.link}
              onPress={() => NavigationHelper.navigate('ForgetPassword')}
            >
              <Text style={globalStyles.linkText}>
                mot de pass oublie
              </Text>
            </TouchableOpacity>
            <LinearGradient colors={['#E4C56D', '#DA407D', '#D6266E']}
                            style={globalStyles.linearGradient}
                            start={{ y: 0.0, x: 0.0 }} end={{ y: 0.0, x: 1.0 }}>
              <Text style={globalStyles.buttonText} onPress={handleSubmit}> LOGIN </Text>
            </LinearGradient>
            <TouchableOpacity
              style={globalStyles.link}
              onPress={() => NavigationHelper.navigate('AuthentificationSignUp')}
            >
              <Text style={globalStyles.linkText}>
                SIGN UP
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}
    </Formik>
  );
}
