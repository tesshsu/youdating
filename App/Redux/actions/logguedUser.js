/* eslint-disable no-undef */
import {
  AsyncStorage
} from 'react-native';
import * as Facebook from 'expo-facebook';
import axios from 'axios';
import path from 'react-native-path';
import { Buffer } from 'buffer';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import * as API from '../../Api';
import * as LOADING_OVERLAY_ACTIONS from './loadingOverlay';
import * as UPLOADS_ACTIONS from './uploads';
import ENV from '../../environment';
import { MOODS } from '../../GlobalConfig';
import NavigationHelper from '../../Helpers/NavigationHelper';
import UtilsHelper from '../../Helpers/UtilsHelper';
import * as NotificationsHelper from '../../Helpers/NotificationsHelper';
import { ensurePermissions } from '../../Helpers/PermissionsHelper';


export const LOGIN = 'logguedUser/LOGIN';
export const LOGOUT = 'logguedUser/LOGOUT';
export const UPDATE = 'logguedUser/UPDATE';
export const FETCH = 'logguedUser/FETCH';

let watchPositionListener = null;

export function signIn({ email, password }) {
  return async (dispatch) => {
    dispatch(LOADING_OVERLAY_ACTIONS.setVisibility(true, 'Connexion...'));

    try {
      const { token, user: { id: userId } } = await API.Auth.signIn({ email, password });
      await AsyncStorage.setItem('ACCESS_TOKEN', token);
      await NotificationsHelper.registerPushNotifications(userId);
      await dispatch(fetch());
      await dispatch({ type: LOGIN });
    } catch (err) {
      console.warn(err);
      throw err;
    } finally {
      dispatch(LOADING_OVERLAY_ACTIONS.setVisibility(false));
    }
  };
}

export function signUp(payload) {
  return async (dispatch) => {
    dispatch(LOADING_OVERLAY_ACTIONS.setVisibility(true, 'Création du compte...'));

    try {
      const { user, token } = await API.Auth.signUp(payload);
      await AsyncStorage.setItem('ACCESS_TOKEN', token);
      await NotificationsHelper.registerPushNotifications(user.id);
      await dispatch(update(user));
      dispatch({ type: LOGIN });
      dispatch(sharePosition());
    } catch (err) {
      throw err;
    } finally {
      dispatch(LOADING_OVERLAY_ACTIONS.setVisibility(false));
    }
  };
}

export function signInUsingFacebook() {
  return async (dispatch) => {
    dispatch(LOADING_OVERLAY_ACTIONS.setVisibility(true, 'Connexion a Facebook...'));

    try {
      const {
        type,
        token: accessToken
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email', 'user_birthday', 'user_gender', 'user_location'],
        behavior: 'native'
      }).toString();

      if (type === 'success') {
        const { token, user: { id: userId } } = await API.Auth.signInWithFacebook({ accessToken });
        await AsyncStorage.setItem('ACCESS_TOKEN', token);
        await NotificationsHelper.registerPushNotifications(userId);
        await dispatch(fetch());
        await dispatch({ type: LOGIN });
      } else {
        return;
      }
    } catch (err) {
      console.warn('Connexion error',err);
      throw err;
    } finally {
      dispatch(LOADING_OVERLAY_ACTIONS.setVisibility(false));
    }
  };
}

export function signOut() {
  return async (dispatch, getState) => {
    const { user: { id: userId } } = getState().logguedUser;
    await NotificationsHelper.unregisterPushNotifications(userId);
    await AsyncStorage.removeItem('ACCESS_TOKEN');
    if (watchPositionListener) {
      watchPositionListener.remove();
    }
    await dispatch({ type: LOGOUT });
  };
}

export function fetch() {
  return async (dispatch) => {
    dispatch(LOADING_OVERLAY_ACTIONS.setVisibility(true, 'Récupération du profil...'));

    try {
      const user = await API.User.me();
      dispatch(update(user));

      if (user.settings.sharePosition) {
        dispatch(sharePosition());
      }
    } catch (err) {
      throw err;
    } finally {
      dispatch(LOADING_OVERLAY_ACTIONS.setVisibility(false));
    }
  };
}

export function fetchRemainingAllowedMessages() {
  return async (dispatch, getState) => {
    const { user } = getState().logguedUser;

    try {
      const { remainingAllowedMessages } = await API.User.getRemainingAllowedMessages(user.id);

      dispatch(update({ ...user, remainingAllowedMessages }));
    } catch (err) {
      console.warn(err);
      throw err;
    }
  };
}

export function uploadAvatar(media, mood = null) {
  return async (dispatch, getState) => {
    const uploadId = `upload-avatar-${mood || 'all'}`;

    try {
      const ext = path.extname(media.uri);
      const fileName = `${Date.now().toString()}${ext}`;
      const { url } = await API.Storage.getPresignedUrl(fileName);
      const { token, cancel } = axios.CancelToken.source();

      dispatch(UPLOADS_ACTIONS.startUpload(uploadId, media.uri, cancel));

      await axios.put(url, Buffer.from(media.base64, 'base64'), {
        onUploadProgress: (ev) => {
          const progress = Math.round((ev.loaded * 100) / ev.total);
          dispatch(UPLOADS_ACTIONS.setUploadProgress(uploadId, progress));
        },
        cancelToken: token
      });

      const { user } = getState().logguedUser;
      const avatar = `${ENV.AWS_BUCKET_URL}/${user.id}/${fileName}`;

      await API.User.updateAvatar(user.id, { mood, avatar });
      await UtilsHelper.cacheImages([avatar]);
      Object.keys(MOODS).forEach((m) => {
        if (!mood || mood === m) {
          user.moods[m].avatar = avatar;
        }
      });
      dispatch(update(user));
    } catch (err) {
      if (axios.isCancel(err)) {
        return;
      }

      throw err;
    } finally {
      dispatch(UPLOADS_ACTIONS.stopUpload(uploadId));
    }
  };
}

export function addPhoto(media, mood) {
  return async (dispatch, getState) => {
    const uploadId = `upload-photo-${mood}`;

    try {
      const ext = path.extname(media.uri);
      const fileName = `${Date.now().toString()}${ext}`;
      const { url } = await API.Storage.getPresignedUrl(fileName);
      const { token, cancel } = axios.CancelToken.source();

      dispatch(UPLOADS_ACTIONS.startUpload(uploadId, media.uri, cancel));

      await axios.put(url, Buffer.from(media.base64, 'base64'), {
        onUploadProgress: (ev) => {
          const progress = Math.round((ev.loaded * 100) / ev.total);
          dispatch(UPLOADS_ACTIONS.setUploadProgress(uploadId, progress));
        },
        cancelToken: token
      });

      const { user } = getState().logguedUser;
      const photo = `${ENV.AWS_BUCKET_URL}/${user.id}/${fileName}`;

      await API.User.addPhoto(user.id, { mood, photo });
      await UtilsHelper.cacheImages([photo]);
      user.moods[mood].photos.push(photo);
      dispatch(update(user));
    } catch (err) {
      if (axios.isCancel(err)) {
        return;
      }

      throw err;
    } finally {
      dispatch(UPLOADS_ACTIONS.stopUpload(uploadId));
    }
  };
}

export function deletePhoto(photo, mood) {
  return async (dispatch, getState) => {
    try {
      const { user } = getState().logguedUser;
      await API.User.deletePhoto(user.id, { mood, photo });
      user.moods[mood].photos.splice(user.moods[mood].photos.indexOf(photo), 1);
      dispatch(update(user));
    } catch (err) {
      console.warn(err);
      throw err;
    }
  };
}

export function submitQuizzAnswers(payload) {
  return async (dispatch, getState) => {
    dispatch(LOADING_OVERLAY_ACTIONS.setVisibility(true, 'Définition de votre personnalité...'));
    const { user } = getState().logguedUser;

    try {
      await API.User.setPersonnalities(user.id, payload);
      user.quizzCompleted = true;
      user.personnalities = payload;
      dispatch(update(user));
      NavigationHelper.navigate('MainTabsProfile');
    } catch (err) {
      console.warn(err);
      throw err;
    } finally {
      dispatch(LOADING_OVERLAY_ACTIONS.setVisibility(false));
    }
  };
}

export function updateQueryAndTag(mood, payload) {
  return async (dispatch, getState) => {
    const { user } = getState().logguedUser;

    try {
      await API.User.updateQueryAndTag(user.id, mood, payload);
      user.moods[mood].query = payload.query;
      user.moods[mood].tag = payload.tag;
      dispatch(update(user));
    } catch (err) {
      console.warn(err);
      throw err;
    }
  };
}

export function updateTag(mood, tag) {
  return async (dispatch, getState) => {
    const { user } = getState().logguedUser;

    try {
      await API.User.updateTag(user.id, mood, tag);
      user.moods[mood].tag = tag;
      dispatch(update(user));
    } catch (err) {
      console.warn(err);
      throw err;
    }
  };
}

export function updateAd(mood, ad) {
  return async (dispatch, getState) => {
    dispatch(LOADING_OVERLAY_ACTIONS.setVisibility(true, 'Mise à jour de votre annonce...'));

    const { user } = getState().logguedUser;

    try {
      await API.User.updateAd(user.id, mood, ad);
      user.moods[mood].ad = ad;
      dispatch(update(user));
    } catch (err) {
      console.warn(err);
      throw err;
    } finally {
      dispatch(LOADING_OVERLAY_ACTIONS.setVisibility(false));
    }
  };
}

export function updateJob(job) {
  return async (dispatch, getState) => {
    const { user } = getState().logguedUser;

    try {
      await API.User.updateJob(user.id, job);
      user.job = job;
      dispatch(update(user));
    } catch (err) {
      console.warn(err);
      throw err;
    }
  };
}

export function updateDescription(mood, description) {
  return async (dispatch, getState) => {
    const { user } = getState().logguedUser;

    try {
      await API.User.updateDescription(user.id, mood, description);
      user.moods[mood].description = description;
      dispatch(update(user));
    } catch (err) {
      console.warn(err);
      throw err;
    }
  };
}

export function updateSkills(payload) {
  return async (dispatch, getState) => {
    const { user } = getState().logguedUser;

    try {
      await API.User.updateSkills(user.id, payload);
      user.skills = payload;
      dispatch(update(user));
    } catch (err) {
      console.warn(err);
      throw err;
    }
  };
}

export function updateSettings(payload) {
  return async (dispatch, getState) => {
    const { user } = getState().logguedUser;

    try {
      await API.User.updateSettings(user.id, payload);
      user.settings = payload;
      dispatch(update(user));
    } catch (err) {
      console.warn(err);
      throw err;
    }
  };
}

export function updateMoodVisibility(mood, visible) {
  return async (dispatch, getState) => {
    const { user } = getState().logguedUser;

    try {
      await API.User.updateMoodVisibility(user.id, mood, visible);
      user.moods[mood].visible = visible;
      dispatch(update(user));
    } catch (err) {
      console.warn(err);
      throw err;
    }
  };
}

export function updateLocation({ latitude, longitude }) {
  return async (dispatch, getState) => {
    const { user } = getState().logguedUser;

    try {
      const [{ city }] = await Location.reverseGeocodeAsync({ latitude, longitude });
      await API.User.updateLocation(user.id, { latitude, longitude, city });
      user.city = city;
      user.location.coordinates = [longitude, latitude];
      dispatch(update(user));
    } catch (err) {
      console.warn(err);
    }
  };
}

export function sharePosition() {
  return async (dispatch, getState) => {
    const { user } = getState().logguedUser;

    if (!user || !user.settings.sharePosition) {
      return;
    }

    if (watchPositionListener) {
      watchPositionListener.remove();
    }

    try {
      await ensurePermissions(Permissions.LOCATION);

      watchPositionListener = await Location.watchPositionAsync({
        accuracy: Location.Accuracy.High,
        distanceInterval: 500,
        timeInterval: 30000,
        mayShowUserSettingsDialog: true
      }, async ({ coords: { latitude, longitude } }) => {
        const { user: logguedUser, isAuthentificated } = getState().logguedUser;

        if (logguedUser && isAuthentificated && logguedUser.settings.sharePosition) {
          await dispatch(updateLocation({ latitude, longitude }));
        } else {
          watchPositionListener.remove();
        }
      });
    } catch (err) {
      console.warn(err);
    }
  };
}

export function updateSharePosition(shouldSharePosition) {
  return async (dispatch, getState) => {
    const { user } = getState().logguedUser;

    try {
      await API.User.updateSharePosition(user.id, { sharePosition: shouldSharePosition });
      user.settings.sharePosition = shouldSharePosition;
      dispatch(update(user));

      if (shouldSharePosition) {
        dispatch(sharePosition());
      } else if (watchPositionListener) {
        watchPositionListener.remove();
      }
    } catch (err) {
      console.warn(err);
      throw err;
    }
  };
}

export function updateMoodSettings(mood, payload) {
  return async (dispatch, getState) => {
    const { user } = getState().logguedUser;

    try {
      await API.User.updateMoodSettings(user.id, mood, payload);
      user.moods[mood] = { ...user.moods[mood], ...payload };
      dispatch(update(user));
    } catch (err) {
      console.warn(err);
      throw err;
    }
  };
}

export function update(user) {
  return {
    type: UPDATE,
    payload: {
      user
    }
  };
}
