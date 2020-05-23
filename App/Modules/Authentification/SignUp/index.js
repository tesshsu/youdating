import React, {
  useState, useCallback, useEffect, useRef
} from 'react';
import ActionSheet from 'react-native-action-sheet';
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
  Button,
  TouchableOpacity,
  Alert,
  Linking,
  ActivityIndicator,
  SafeAreaView, Image,
} from 'react-native';
import { useFormik } from 'formik';
import moment from 'moment';
import * as Yup from 'yup';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import useGoogleAutocomplete from 'use-google-autocomplete';
import { useDebounce } from 'use-debounce';
import { Feather } from '@expo/vector-icons';

import ENV from '../../../environment';
import globalStyles from '../styles';
import styles from './styles';
import NavigationHelper from '../../../Helpers/NavigationHelper';
import FacebookConnectButton from '../../Global/FacebookConnectButton';
import TextField from '../../Global/TextField';
import SwitchSelector from '../../Global/SwitchSelector';
import AuthentificationButton from '../../Global/AuthentificationButton';
import useLogguedUser from '../../../Hooks/useLogguedUser';
import { moderateScale } from '../../../Helpers/ScaleHelper';
import Images from '../../../Assets/images';
import { LinearGradient } from 'expo-linear-gradient';

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
    .required('Ce champs est requis'),
    //.test('age', 'Vous devez être âgé d\'au moins 18 ans pour utiliser You\'s', checkAge),
  year: Yup
    .number()
    .required('Ce champs est requis'),
  month: Yup
    .number()
    .required('Ce champs est requis'),
  day: Yup
    .number()
    .required('Ce champs est requis'),
  gender: Yup
    .string()
    .trim()
    .oneOf(['MALE', 'FEMALE'])
    .required('Ce champs est requis'),
  formattedAddress: Yup
    .string()
    .trim()
});

export default  function AuthentificationSignUp() {
  const scrollViewRef = useRef();
  const { signUp, isAuthentificated } = useLogguedUser();
  const [address, setAddress] = useState('');
  const [addressQuery] = useDebounce(address, 2000);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isFirst, setFirst] = useState(true);
  const [day, setDay] = useState(0);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);

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
      gender: '',
      day: '',
      month: '',
      year: '',
      birthday: '22/06/1988',
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
      types: 'cities',
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

  const options = [
    { label: "homme", value: "MALE" },
    { label: "femme", value: "FEMALE" }
  ];

  return (
    <View style={globalStyles.scrollViewContainer} >
      <View style={globalStyles.backgroundContainer}>
        <Image style={globalStyles.bakcgroundImage} source={Images.back_img_signIn} />
      </View>
      <ScrollView
        ref={scrollViewRef}
        style={styles.fill}
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
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
                scrollViewRef={scrollViewRef}
                containerStyle={globalStyles.textField}
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
                containerStyle={globalStyles.textField}
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
                containerStyle={globalStyles.textField}
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
            </> : <>
              <TextField
                scrollViewRef={scrollViewRef}
                containerStyle={globalStyles.textField}
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
                containerStyle={globalStyles.textField}
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
              <SwitchSelector
                label="Sexe"
                style={globalStyles.switchSelector}
                buttonColor="#dd6379"
                options={options}
                initial={0}
                onPress={(value) => handleChange('gender')}
              />
              <View style={globalStyles.ageView}>
                <TextField
                  scrollViewRef={scrollViewRef}
                  containerStyle={globalStyles.columnTextField}
                  label="Age"
                  textInputProps={{
                    placeholder: 'jour',
                    keyboardType: 'number-pad',
                    value: values.day,
                    onChangeText: handleChange('day')
                  }}
                />
                <TextField
                containerStyle={globalStyles.columnTextField}
                label=""
                textInputProps={{
                  placeholder: 'mois',
                  keyboardType: 'number-pad',
                  value: values.month,
                  onChangeText: handleChange('month')
                }}
               />
              <TextField
                containerStyle={globalStyles.columnTextField}
                label=""
                textInputProps={{
                  placeholder: 'annee',
                  keyboardType: 'number-pad',
                  value: values.year,
                  onChangeText: handleChange('year')
                }}
              />
              </View>
              <TextField
                scrollViewRef={scrollViewRef}
                containerStyle={globalStyles.textField}
                label="ville"
                error={errors.formattedAddress}
                textInputProps={{
                  placeholder: 'Nice',
                  autoCapitalize: 'sentences',
                  textContentType: 'addressCity',
                  value: selectedPlace ? selectedPlace.description : address,
                  onChangeText: (val) => {
                    setSelectedPlace(null);
                    setAddress(val);
                  }
                }}
              />
            </>
        }

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
          {
            isFirst ?
              <LinearGradient colors={['#E4C56D', '#DA407D', '#D6266E']}
                              style={globalStyles.linearGradient}
                              start={{ y: 0.0, x: 0.0 }} end={{ y: 0.0, x: 1.0 }}>
                <Text style={globalStyles.buttonText} onPress={ ()=> setFirst(false) }> suivant </Text>
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
  );
}
