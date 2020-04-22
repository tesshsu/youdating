import React, {
  useState, useCallback, useEffect, useRef
} from 'react';
import ActionSheet from 'react-native-action-sheet';
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { useFormik } from 'formik';
import moment from 'moment';
import * as Yup from 'yup';

import useGoogleAutocomplete from 'use-google-autocomplete';
import { useDebounce } from 'use-debounce';
import { Feather } from '@expo/vector-icons';

import ENV from '../../../environment';
import styles from './styles';
import NavigationHelper from '../../../Helpers/NavigationHelper';
import FacebookConnectButton from '../../Global/FacebookConnectButton';
import TextField from '../../Global/TextField';
import AuthentificationButton from '../../Global/AuthentificationButton';
import useLogguedUser from '../../../Hooks/useLogguedUser';
import { moderateScale } from '../../../Helpers/ScaleHelper';

function checkAge(birthday) {
  const birthdayMoment = moment.unix(birthday);

  return moment().diff(birthdayMoment, 'years') >= 18;
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
  passwordConfirmation: Yup
    .string()
    .trim()
    .required('Ce champs est requis')
    .oneOf(
      [Yup.ref('password'), null],
      'Le mot de passe à mal été confirmé'
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
    .required('Ce champs est requis'),
  formattedAddress: Yup
    .string()
    .trim()
    .required('Vous n\'avez pas séléctionné d\'adresse')
});

export default function AuthentificationSignUp() {
  const scrollViewRef = useRef();
  const { signUp, isAuthentificated } = useLogguedUser();
  const [address, setAddress] = useState('');
  const [addressQuery] = useDebounce(address, 2000);
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    if (isAuthentificated) {
      NavigationHelper.navigate('PostSignUpIntro');
    }
  }, [isAuthentificated]);

  const {
    handleChange,
    values,
    handleSubmit,
    errors,
    setErrors
  } = useFormik({
    validationSchema: SignUpSchema,
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
    initialValues: {
      email: '',
      lastName: '',
      firstName: '',
      password: '',
      passwordConfirmation: '',
      gender: 'MALE',
      birthday: '',
      formattedAddress: ''
    },
    onSubmit
  });

  const {
    results,
    isLoading,
    getPlaceDetails
  } = useGoogleAutocomplete({
    query: addressQuery,
    apiKey: ENV.GOOGLE_API_KEY,
    options: {
      types: 'address',
    }
  });

  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const chooseGender = useCallback(() => {
    ActionSheet.showActionSheetWithOptions({
      title: 'Vous êtes ?',
      options: ['Un Homme', 'Une femme'],
    }, (buttonIndex) => {
      handleChange('gender')(buttonIndex === 0 ? 'MALE' : 'FEMALE');
    });
  }, [handleChange]);

  const getLocation = useCallback(async () => {
    const { status, result } = await getPlaceDetails(selectedPlace.place_id);

    if (status !== 'OK') {
      throw new Error(status);
    }

    const {
      location: {
        lat,
        lng
      }
    } = result.geometry;

    return {
      lat,
      long: lng
    };
  }, [getPlaceDetails, selectedPlace]);

  async function onSubmit(formValues) {
    let location;
    const {
      birthday,
      ...payload
    } = formValues;

    try {
      location = await getLocation();
    } catch (err) {
      console.warn(err);
      Alert.alert('Erreur', 'Impossible de récupérer les informations de cette adresse');
      return;
    }

    try {
      await signUp({
        ...payload,
        birthday: Number(birthday),
        location
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

  useEffect(() => {
    if ((results.predictions.length || isLoading) && scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd();
    }
  }, [isLoading, results]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <SafeAreaView
        style={styles.scrollViewContainer}
      >
        
        <ScrollView
          ref={scrollViewRef}
          style={styles.fill}
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.yousTitleText}>{'You\'s'}</Text>
          <Text style={styles.subTitleText}>Application de rencontre</Text>
          <Text style={styles.subSubTitleText}>Reseau 3.0</Text>
          <FacebookConnectButton />
          <View style={styles.or}>
            <View style={styles.bar} />
            <Text style={styles.orText}>ou</Text>
            <View style={styles.bar} />
          </View>
          <Text style={styles.createAccountText}>crée un compte</Text>
          <TextField
            scrollViewRef={scrollViewRef}
            containerStyle={styles.textField}
            label="Email"
            error={errors.email}
            textInputProps={{
              placeholder: 'email',
              autoCapitalize: 'none',
              keyboardType: 'email-address',
              textContentType: 'emailAddress',
              value: values.email,
              onChangeText: handleChange('email')
            }}
          />
          <TextField
            scrollViewRef={scrollViewRef}
            containerStyle={styles.textField}
            label="Mot de passe"
            error={errors.password}
            textInputProps={{
              placeholder: 'mot de passe',
              autoCapitalize: 'none',
              secureTextEntry: true,
              value: values.password,
              onChangeText: handleChange('password')
            }}
          />
          <TextField
            scrollViewRef={scrollViewRef}
            containerStyle={styles.textField}
            label="Confirmation du mot de passe"
            error={errors.passwordConfirmation}
            textInputProps={{
              placeholder: 'Confirmation du mot de passe',
              autoCapitalize: 'none',
              secureTextEntry: true,
              value: values.passwordConfirmation,
              onChangeText: handleChange('passwordConfirmation')
            }}
          />
          <TextField
            scrollViewRef={scrollViewRef}
            containerStyle={styles.textField}
            label="Nom"
            error={errors.lastName}
            textInputProps={{
              placeholder: 'Nom',
              autoCapitalize: 'words',
              textContentType: 'familyName',
              value: values.lastName,
              onChangeText: handleChange('lastName')
            }}
          />
          <TextField
            scrollViewRef={scrollViewRef}
            containerStyle={styles.textField}
            label="Prénom"
            error={errors.firstName}
            textInputProps={{
              placeholder: 'Prénom',
              autoCapitalize: 'words',
              textContentType: 'name',
              value: values.firstName,
              onChangeText: handleChange('firstName')
            }}
          />
          <TouchableOpacity onPress={chooseGender}>
            <View pointerEvents="none">
              <TextField
                scrollViewRef={scrollViewRef}
                containerStyle={styles.textField}
                label="Vous êtes"
                error={errors.gender}
                textInputProps={{
                  value: values.gender === 'MALE' ? 'Un Homme' : 'Une Femme',
                  editable: false
                }}
              />
            </View>
          </TouchableOpacity>
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
            </View>
            {errors.birthday && <Text style={styles.errorText}>{ errors.birthday }</Text>}
          </TouchableOpacity>
          <TextField
            scrollViewRef={scrollViewRef}
            label="Adresse"
            containerStyle={styles.textField}
            error={errors.formattedAddress}
            textInputProps={{
              placeholder: 'Adresse',
              autoCapitalize: 'sentences',
              textContentType: 'addressCityAndState',
              value: selectedPlace ? selectedPlace.description : address,
              onChangeText: (val) => {
                setSelectedPlace(null);
                setAddress(val);
              }
            }}
          />
          { isLoading && (
            <ActivityIndicator
              style={styles.loader}
              size="large"
              color="black"
            />
          )}
          { selectedPlace === null && results.predictions.map(p => (
            <TouchableOpacity
              key={p.place_id}
              onPress={() => {
                handleChange('formattedAddress')(p.description);
                setSelectedPlace(p);
              }}
              style={styles.predictionButton}
            >
              <Feather
                style={styles.predictionMarker}
                name="map-pin"
                size={moderateScale(15)}
                color="#84B5E4"
              />
              <Text style={styles.predictionText}>
                { p.description }
              </Text>
            </TouchableOpacity>
          ))}
          <View style={styles.footer}>
            <AuthentificationButton
              text="Créer mon compte"
              containerStyle={styles.nextButton}
              onPress={handleSubmit}
            />
            <TouchableOpacity
              style={styles.link}
              onPress={() => NavigationHelper.navigate('AuthentificationSignIn')}
            >
              <Text style={styles.linkText}>
                SIGN IN
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
