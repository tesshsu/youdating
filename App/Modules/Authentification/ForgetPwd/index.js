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
import globalStyles from '../styles';
import styles from './styles';
import NavigationHelper from '../../../Helpers/NavigationHelper';
import useLogguedUser from '../../../Hooks/useLogguedUser';
import AuthentificationButton from '../../Global/AuthentificationButton';
import FacebookConnectButton from '../../Global/FacebookConnectButton';
import TextField from '../../Global/TextField';
import Images from '../../../Assets/images';

export default function ForgetPassword() {
  const {
    isAuthentificated,
    logguedUser,

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
        email: ''
      }}
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
        <View style={globalStyles.scrollViewContainer} >
          <View style={globalStyles.backgroundContainer}>
            <Image style={globalStyles.bakcgroundImage} source={Images.back_img_signIn} />
          </View>
          <ScrollView
            style={globalStyles.scrollView}
            contentContainerStyle={globalStyles.content}
          >
            <Text style={styles.subTitleText}>{'MOT DE PASS OUBLIE ?'}</Text>
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
            <LinearGradient colors={['#E4C56D', '#DA407D', '#D6266E']}
                            style={globalStyles.linearGradient}
                            start={{ y: 0.0, x: 0.0 }} end={{ y: 0.0, x: 1.0 }}>
              <Text style={globalStyles.buttonText} onPress={handleSubmit}> SOUMETTRE </Text>
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
