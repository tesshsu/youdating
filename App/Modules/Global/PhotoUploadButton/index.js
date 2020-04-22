import React, { useMemo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ActionSheet from 'react-native-action-sheet';

import useGetMedia from '../../../Hooks/useGetMedia';
import useUploads from '../../../Hooks/useUploads';
import useCurrentMood from '../../../Hooks/useCurrentMood';

export default function PhotoUploadButton(props) {
  const {
    children,
    mediaOptions,
    uploadId,
    onMedia,
    renderUpload
  } = props;

  const {
    getMedia,
    media,
    deleteMedia
  } = useGetMedia(mediaOptions);

  const { moodInfos } = useCurrentMood();
  const { getUploadById } = useUploads();
  const upload = useMemo(() => getUploadById(uploadId), [uploadId, getUploadById]);

  useEffect(() => {
    if (media) {
      onMedia(media);
      deleteMedia();
    }
  }, [onMedia, media, deleteMedia]);

  const onCancelUpload = useCallback(() => {
    ActionSheet.showActionSheetWithOptions({
      title: 'Téléchargement en cours...',
      options: ['Annuler le téléchargement', 'Annuler'],
      destructiveButtonIndex: 0,
      cancelButtonIndex: 1,
      tintColor: moodInfos.color
    },
    (buttonIndex) => {
      if (buttonIndex === 0) {
        if (upload && upload.cancel) {
          upload.cancel();
        }
      }
    });
  }, [upload, moodInfos]);

  if (upload) {
    return renderUpload(upload, onCancelUpload);
  }

  return (
    <TouchableOpacity
      onPress={getMedia}
    >
      { children }
    </TouchableOpacity>
  );
}

PhotoUploadButton.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  mediaOptions: PropTypes.object.isRequired,
  uploadId: PropTypes.string.isRequired,
  onMedia: PropTypes.func.isRequired,
  renderUpload: PropTypes.func.isRequired
};
