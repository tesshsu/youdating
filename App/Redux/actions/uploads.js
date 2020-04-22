export const START_UPLOAD = 'uploads/START_UPLOAD';
export const STOP_UPLOAD = 'uploads/STOP_UPLOAD';
export const SET_UPLOAD_PROGRESS = 'uploads/SET_PROGRESS';

export function startUpload(id, uri, cancel) {
  return {
    type: START_UPLOAD,
    payload: {
      id,
      uri,
      cancel
    }
  };
}

export function setUploadProgress(id, progress) {
  return {
    type: SET_UPLOAD_PROGRESS,
    payload: {
      id,
      progress
    }
  };
}

export function stopUpload(id) {
  return {
    type: STOP_UPLOAD,
    payload: {
      id
    }
  };
}
