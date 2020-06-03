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

export default function AuthentificationSignUp() {
  const [isFirst, setFirst] = useState(true);
  const {
    signIn,
    isAuthentificated,
    logguedUser
  } = useLogguedUser();

  useEffect(() => {
    if (isAuthentificated && logguedUser) {
      NavigationHelper.navigate('MainNavigator');
    }
  }, [isAuthentificated, logguedUser]);

  return (
    <Formik
      initialValues={{
        email: 'testingVachatttt@gmail.com',
        password: 'Tess0542!',
        gender: 'female',
        birthday: '19880101',
        firstName: 'tess',
        lastName: 'hsu'
      }}
      onSubmit={async ({ email, password, gender, birthday, firstName, lastName }) => {
        try {
          await signIn(
            email.trim(),
            password.trim(),
            gender.trim(),
            birthday.trim(),
            firstName.trim(),
            lastName.trim()
          );
        } catch (err) {
          Alert.alert('SignIn error', err.message);
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
              label="GENDER"
              textInputProps={{
                autoCapitalize: 'none',
                placeholder: 'gender',
                onChangeText: handleChange('gender'),
                value: values.gender,
                secureTextEntry: false,
              }}
            />
            <TextField
              containerStyle={globalStyles.textField}
              label="birthday"
              textInputProps={{
                autoCapitalize: 'none',
                placeholder: 'birthday',
                onChangeText: handleChange('birthday'),
                value: values.birthday,
                secureTextEntry: false,
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
            <LinearGradient colors={['#E4C56D', '#DA407D', '#D6266E']}
                            style={globalStyles.linearGradient}
                            start={{ y: 0.0, x: 0.0 }} end={{ y: 0.0, x: 1.0 }}>
              <Text style={globalStyles.buttonText} onPress={handleSubmit}> SIGNIN </Text>
            </LinearGradient>
            <TouchableOpacity
              style={globalStyles.link}
              onPress={() => NavigationHelper.navigate('AuthentificationSignIn')}
            >
              <Text style={globalStyles.linkText}>
                SIGN IN
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}
    </Formik>
  );
}
