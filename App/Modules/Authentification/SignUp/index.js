import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image, Linking,
} from 'react-native';
import moment from 'moment';
import * as Yup from 'yup';
import { Formik, useFormik } from 'formik';
import { LinearGradient } from 'expo-linear-gradient';
import SwitchSelector from '../../Global/SwitchSelector';
import styles from './styles';
import globalStyles from '../styles';
import NavigationHelper from '../../../Helpers/NavigationHelper';
import useLogguedUser from '../../../Hooks/useLogguedUser';
import FacebookConnectButton from '../../Global/FacebookConnectButton';
import TextField from '../../Global/TextField';
import Images from '../../../Assets/images';

function checkAge(birthday) {
  const birthdayMoment = moment.unix(birthday);

  return moment().diff(birthdayMoment, 'years') >= 18;
}

const emailFaker = () => {
  let chars = 'abcdefghijklmnopqrstuvwxyz'
  return 'testing'+chars[Math.floor(Math.random() * 26)]
    + Math.random().toString(36).substring(2, 11)
    + '@mail.com';
}

const SignUpSchema = Yup.object().shape({
  email: Yup
    .string()
    .trim()
    .email('Ce n\'est pas une adresse email valide').required('Ce champs est requis'),
  lastName: Yup.string().required('Ce champs est requis'),
  firstName: Yup.string().required('Ce champs est requis'),
  password: Yup
    .string()
    .trim()
    .required('Ce champs est requis')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
      'Le mot de passe doit contenir au moins 6 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial'
    ),
  birthday: Yup
    .string()
    .trim()
    .required('Ce champs est requis')
    .test('age', 'Vous devez être âgé d\'au moins 18 ans pour utiliser You\'s', checkAge),
  gender: Yup
    .string()
    .trim()
    .oneOf(['MALE', 'FEMALE'])
    .required('Ce champs est requis')
});

export default function AuthentificationSignUp() {
  const [isFirst, setFirst] = useState(true);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
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

  async function onSubmit(formValues) {
    let location;
    const {
      birthday,
      ...payload
    } = formValues;

    try {
      await signUp({
        ...payload,
        birthday: Number(birthday)
      });
    } catch (err) {
      console.warn(err);
      if (err.response && err.response.status === 422) {
        setErrors({
          email: 'Cet email est déjà utilisée'
        });
      } else {
        Alert.alert('Enregistrement', 'Impossible de créer le compte');
      }
    }
  }
  const {
    handleChange,
    values,
    handleSubmit,
    errors,
    setErrors
  } = useFormik({
    validationSchema: SignUpSchema,
    validateOnChange: true,
    validateOnBlur: false,
    validateOnMount: false,
    onSubmit
  });


  const randomEmail = emailFaker();

  return (
    <Formik
      initialValues={{
        email: randomEmail,
        password: '1StrongPassword$',
        gender: 'male',
        birthday: '',
        firstName: 'tess',
        lastName: 'hsu',
        ville: 'Nice'
      }}
      onSubmit={async ({
        email,
        password,
        gender,
        birthday,
        firstName,
        lastName,
        ville
      }) => {
        try {
          const data = {};
          data.email = email.trim();
          data.password = password.trim();
          data.gender = gender.trim();
          data.birthday = birthday.trim();
          data.firstName = firstName.trim();
          data.lastName = lastName.trim();
          data.ville = ville.trim();
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
                  <TouchableOpacity
                    onPress={() => setIsDatePickerVisible(true)}
                  >
                    <Text style={styles.birthdaylabelText}>
                      Date de naissance
                    </Text>
                    <View style={styles.birthdayRow} pointerEvents="none">
                      <TextField
                        containerStyle={styles.birthdayTextField}
                        textInputProps={{
                          placeholder: 'JJ',
                          autoCapitalize: 'none',
                          value: values.birthday ? moment.unix(values.birthday).format('DD') : '',
                        }}
                      />
                      <TextField
                        containerStyle={styles.birthdayTextField}
                        textInputProps={{
                          placeholder: 'MM',
                          value: values.birthday ? moment.unix(values.birthday).format('MM') : '',
                        }}
                      />
                      <TextField
                        containerStyle={[
                          styles.birthdayTextField,
                          { marginRight: 0 }
                        ]}
                        textInputProps={{
                          placeholder: 'YYYY',
                          value: values.birthday ? moment.unix(values.birthday).format('YYYY') : '',
                        }}
                      />
                      {errors.birthday && <Text style={styles.errorText}>{ errors.birthday }</Text>}
                    </View>
                  </TouchableOpacity>
                  <TextField
                    containerStyle={globalStyles.textField}
                    label="ville"
                    textInputProps={{
                      autoCapitalize: 'none',
                      placeholder: 'ville',
                      onChangeText: handleChange('ville'),
                      value: values.ville,
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
