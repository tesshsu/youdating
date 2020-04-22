import { useSelector, useDispatch } from 'react-redux';

import { useCallback } from 'react';
import * as LOGGUED_USER_ACTIONS from '../Redux/actions/logguedUser';

export default function useLogguedUser() {
  const logguedUser = useSelector(state => state.logguedUser);

  const dispatch = useDispatch();

  const signIn = useCallback(
    (email, password) => dispatch(LOGGUED_USER_ACTIONS.signIn({ email, password })),
    [dispatch]
  );

  const signUp = useCallback(
    payload => dispatch(LOGGUED_USER_ACTIONS.signUp(payload)),
    [dispatch]
  );

  const signInUsingFacebook = useCallback(
    () => dispatch(LOGGUED_USER_ACTIONS.signInUsingFacebook()),
    [dispatch]
  );

  const signOut = useCallback(
    () => dispatch(LOGGUED_USER_ACTIONS.signOut()),
    [dispatch]
  );

  const fetch = useCallback(
    () => dispatch(LOGGUED_USER_ACTIONS.fetch()),
    [dispatch]
  );

  const fetchRemainingAllowedMessages = useCallback(
    () => dispatch(LOGGUED_USER_ACTIONS.fetchRemainingAllowedMessages()),
    [dispatch]
  );

  const updateLogguedUser = (
    user => dispatch(LOGGUED_USER_ACTIONS.update(user)),
    [dispatch]
  );

  const uploadAvatar = useCallback(
    (file, mood = null) => dispatch(LOGGUED_USER_ACTIONS.uploadAvatar(file, mood)),
    [dispatch]
  );

  const addPhoto = useCallback(
    (photo, mood) => dispatch(LOGGUED_USER_ACTIONS.addPhoto(photo, mood)),
    [dispatch]
  );

  const removePhoto = useCallback(
    (photo, mood) => dispatch(LOGGUED_USER_ACTIONS.deletePhoto(photo, mood)),
    [dispatch]
  );

  const submitQuizzAnswers = useCallback(
    payload => dispatch(LOGGUED_USER_ACTIONS.submitQuizzAnswers(payload)),
    [dispatch]
  );

  const updateSkills = useCallback(
    payload => dispatch(LOGGUED_USER_ACTIONS.updateSkills(payload)),
    [dispatch]
  );

  const updateQueryAndTag = useCallback(
    (mood, payload) => dispatch(LOGGUED_USER_ACTIONS.updateQueryAndTag(mood, payload)),
    [dispatch]
  );

  const updateTag = useCallback(
    (mood, tag) => dispatch(LOGGUED_USER_ACTIONS.updateTag(mood, tag)),
    [dispatch]
  );

  const updateAd = useCallback(
    (mood, ad) => dispatch(LOGGUED_USER_ACTIONS.updateAd(mood, ad)),
    [dispatch]
  );

  const updateJob = useCallback(
    job => dispatch(LOGGUED_USER_ACTIONS.updateJob(job)),
    [dispatch]
  );

  const updateDescription = useCallback(
    (mood, description) => dispatch(LOGGUED_USER_ACTIONS.updateDescription(mood, description)),
    [dispatch]
  );

  const updateGlobalSettings = useCallback(
    settings => dispatch(LOGGUED_USER_ACTIONS.updateSettings(settings)),
    [dispatch]
  );

  const updateMoodVisibility = useCallback(
    (mood, visible) => dispatch(LOGGUED_USER_ACTIONS.updateMoodVisibility(mood, visible)),
    [dispatch]
  );

  const sharePosition = useCallback(
    () => dispatch(LOGGUED_USER_ACTIONS.sharePosition()),
    [dispatch]
  );

  const updateSharePosition = useCallback(
    shoudSharePosition => dispatch(LOGGUED_USER_ACTIONS.updateSharePosition(shoudSharePosition)),
    [dispatch]
  );

  const updateMoodSettings = useCallback(
    (mood, settings) => dispatch(LOGGUED_USER_ACTIONS.updateMoodSettings(mood, settings)),
    [dispatch]
  );

  return {
    isAuthentificated: logguedUser.isAuthentificated,
    logguedUser: logguedUser.user,
    signIn,
    signUp,
    signInUsingFacebook,
    signOut,
    fetch,
    fetchRemainingAllowedMessages,
    updateLogguedUser,
    uploadAvatar,
    addPhoto,
    removePhoto,
    submitQuizzAnswers,
    updateSkills,
    updateQueryAndTag,
    updateTag,
    updateAd,
    updateJob,
    updateDescription,
    updateGlobalSettings,
    updateMoodVisibility,
    sharePosition,
    updateSharePosition,
    updateMoodSettings
  };
}
