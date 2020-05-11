import React, { useEffect } from 'react';
import {
  KeyboardAvoidingView,
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


export default function ForgetPassword() {
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
      onSubmit={async ({ email }) => {
        try {
          await signIn(
            email.trim()
          );
        } catch (err) {
          Alert.alert('Authentification', 'Identifiants EMAIL incorrects');
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
            <Text style={styles.subTitleText}>{'MOT DE PASS OUBLIE ?'}</Text>
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
            <AuthentificationButton
              text="SOUMETTRE"
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
