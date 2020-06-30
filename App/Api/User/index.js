import client from '../client';

export function me() {
  return client
    .get('users/me')
    .then(({ data }) => data);
}

export function getUser(id) {
  return client
    .get(`users/${id}`)
    .then(({ data }) => data);
}

export function getRemainingAllowedMessages(userId) {
  return client
    .get(`users/${userId}/remainingAllowedMessages`)
    .then(({ data }) => data);
}

export function updateDeviceToken(userId, deviceId, token) {
  return client
    .put(`users/${userId}/deviceTokens/${deviceId}`, { token });
}

export function deleteDeviceToken(userId, deviceId) {
  return client
    .delete(`users/${userId}/deviceTokens/${deviceId}`);
}

export async function updateAvatar(userId, payload) {
  return client
    .put(`users/${userId}/avatar`, payload);
}

export async function addPhoto(userId, payload) {
  return client
    .post(`users/${userId}/photos`, payload);
}

export async function deletePhoto(userId, payload) {
  return client
    .put(`users/${userId}/photos`, payload);
}

export async function setpersonalities(userId, payload) {
  return client
    .post(`users/${userId}/personalities`, payload);
}

export async function updateSkills(userId, payload) {
  return client
    .put(`users/${userId}/skills`, payload);
}

export async function updateSettings(userId, settings) {
  return client
    .put(`users/${userId}/settings`, { settings });
}

export async function updateQueryAndTag(userId, mood, payload) {
  return client
    .put(`users/${userId}/moods/${mood}/queryAndTag`, payload);
}

export async function updateTag(userId, mood, tag) {
  return client
    .put(`users/${userId}/moods/${mood}/tag`, { tag });
}

export async function updateAd(userId, mood, ad) {
  return client
    .put(`users/${userId}/moods/${mood}/ad`, { ad });
}

export async function updateJob(userId, job) {
  return client
    .put(`users/${userId}/job`, { job });
}

export async function updateDescription(userId, mood, description) {
  return client
    .put(`users/${userId}/moods/${mood}/description`, { description });
}

export async function search(params) {
  return client
    .get('users/search', { params })
    .then(({ data }) => data);
}

export async function updateMoodVisibility(userId, mood, visible) {
  return client
    .put(`users/${userId}/moods/${mood}/visible`, {
      visible
    });
}

export async function updateLocation(userId, payload) {
  return client
    .put(`users/${userId}/location`, payload)
    .then(({ data }) => data);
}

export async function updateSharePosition(userId, payload) {
  return client
    .put(`users/${userId}/sharePosition`, payload);
}

export async function updateMoodSettings(userId, mood, payload) {
  return client
    .put(`users/${userId}/moods/${mood}/settings`, payload);
}

export async function searchNear(mood) {
  return client
    .get(`users/moods/${mood}/searchNear`)
    .then(({ data }) => data);
}
