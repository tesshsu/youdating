import React, { useEffect, useState } from 'react';
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
import SwitchSelector from '../../Global/SwitchSelector';
import styles from './styles';
import globalStyles from '../styles';
import NavigationHelper from '../../../Helpers/NavigationHelper';
import useLogguedUser from '../../../Hooks/useLogguedUser';
import FacebookConnectButton from '../../Global/FacebookConnectButton';
import TextField from '../../Global/TextField';
import Images from '../../../Assets/images';

const emailFaker = () => {
  let chars = 'abcdefghijklmnopqrstuvwxyz'
  return 'testing'+chars[Math.floor(Math.random() * 26)]
    + Math.random().toString(36).substring(2, 11)
    + '@mail.com';
}

export default function AuthentificationSignUp() {
  const [isFirst, setFirst] = useState(true);
  const {
    signUp,
    isAuthentificated,
    logguedUser
  } = useLogguedUser();

  const options = [
    { label: "homme", value: "male" },
    { label: "femme", value: "female" }
  ];

  useEffect(() => {
    if (isAuthentificated && logguedUser) {
      NavigationHelper.navigate('PostSignUpIntro');
    }
  }, [isAuthentificated, logguedUser]);

  const randomEmail = emailFaker();

  return (
    <Formik
      initialValues={{
        email: randomEmail,
        password: '1StrongPassword$',
        gender: 'male',
        birthday: '02101990',
        firstName: 'tess',
        lastName: 'hsu'
      }}
      onSubmit={async ({
        email,
        password,
        gender,
        birthday,
        firstName,
        lastName
      }) => {
        try {
          const data = {};
          data.email = email.trim();
          data.password = password.trim();
          data.gender = gender.trim();
          data.birthday = birthday.trim();
          data.firstName = firstName.trim();
          data.lastName = lastName.trim();
          await signUp(data);
        } catch (err) {
          Alert.alert('SignIn error', err.message);
        }
      }}
    >
      {({ handleChange, handleSubmit, values }) => (
        <View style={globalStyles.scrollViewContainer}>
          <View style={globalStyles.backgroundContainer}>
            <Image style={globalStyles.bakcgroundImage} source={Images.back_img_signIn} />
          </View>
          <ScrollView
            style={globalStyles.scrollView}
            contentContainerStyle={styles.content}
          >
            <Text style={styles.yousTitleText}>{'You\'s'}</Text>
            <Text style={styles.subTitleText}>LA RELATION SUR MESURE</Text>
            <Text style={styles.subSubTitleText}>Reseau 3.0</Text>
            <FacebookConnectButton />
            <View style={globalStyles.or}>
              <View style={globalStyles.bar} />
              <Text style={globalStyles.orText}>ou</Text>
              <View style={globalStyles.bar} />
            </View>
            <Text style={styles.createAccountText}>crée un compte</Text>
            {
              isFirst ?
                <>
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
                  <TextField
                    containerStyle={globalStyles.textField}
                    label="firstName"
                    textInputProps={{
                      autoCapitalize: 'none',
                      placeholder: 'firstName',
                      onChangeText: handleChange('firstName'),
                      value: values.firstName,
                      secureTextEntry: false,
                    }}
                  />
                  <TextField
                    containerStyle={globalStyles.textField}
                    label="lastName"
                    textInputProps={{
                      autoCapitalize: 'none',
                      placeholder: 'lastName',
                      onChangeText: handleChange('lastName'),
                      value: values.lastName,
                      secureTextEntry: false,
                    }}
                  />
                </> : <>
                  <SwitchSelector
                    label="Sexe"
                    style={globalStyles.switchSelector}
                    buttonColor="#dd6379"
                    options={options}
                    initial={0}
                    onPress={(value) => handleChange('gender')}
                  />
                  <TextField
                    containerStyle={globalStyles.textField}
                    label="birthday"
                    placeholder='02101990'
                    keyboardType="numeric"
                    textInputProps={{
                      autoCapitalize: 'none',
                      placeholder: 'birthday',
                      onChangeText: handleChange('birthday'),
                      value: values.birthday,
                      secureTextEntry: false,
                    }}
                  />
                </>
            }

            <View style={styles.footer}>
              {
                isFirst ?
                  <LinearGradient colors={['#E4C56D', '#DA407D', '#D6266E']}
                    style={globalStyles.linearGradient}
                    start={{ y: 0.0, x: 0.0 }} end={{ y: 0.0, x: 1.0 }}>
                    <Text style={globalStyles.buttonText} onPress={() => setFirst(false)}> suivant </Text>
                  </LinearGradient> : <LinearGradient colors={['#E4C56D', '#DA407D', '#D6266E']}
                    style={globalStyles.linearGradient}
                    start={{ y: 0.0, x: 0.0 }} end={{ y: 0.0, x: 1.0 }}>
                    <Text style={globalStyles.buttonText} onPress={handleSubmit}> Créer mon compte </Text>
                  </LinearGradient>
              }
              <TouchableOpacity
                style={globalStyles.link}
                onPress={() => NavigationHelper.navigate('AuthentificationSignIn')}
              >
                <Text style={globalStyles.linkText}>
                  SIGN IN
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}
    </Formik>
  );
}
