/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */

import { Image } from 'react-native';
import * as FileSystem from 'expo-file-system';
import moment from 'moment';

function deepEqual(a, b) {
  if (a === b) {
    return true;
  }

  for (const key of Object.keys(a)) {
    if (typeof b[key] === 'undefined') {
      return false;
    }

    if (
      typeof a[key] === 'object'
      && typeof b[key] === 'object'
      && !deepEqual(a[key], b[key])
    ) {
      return false;
    }

    if (a[key] !== b[key]) {
      return false;
    }
  }

  return true;
}

function createTapper(options) {
  let tapped = false;
  let timeout;

  return function onTap() {
    if (tapped === true) {
      clearTimeout(timeout);

      if (options.double) {
        options.double();
      }

      tapped = false;
    } else {
      tapped = true;

      timeout = setTimeout(() => {
        if (options.single) {
          options.single();
        }

        tapped = false;
      }, options.delay || 800);
    }
  };
}

function cacheImages(images) {
  return Promise.all(images.map(i => Image.prefetch(i)));
}

function fileUriToBase64(uri) {
  return FileSystem
    .readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64
    });
}

function getDateText(sentAtMoment) {
  if (moment().get('dayOfYears') === sentAtMoment.get('dayOfYears')) {
    return 'Aujourd\'hui';
  }

  const isSameYear = moment().get('year') === sentAtMoment.get('year');
  return sentAtMoment.format(`dddd DD MMMM${isSameYear ? '' : ' YYYY'}`).capitalize();
}

export default {
  deepEqual,
  createTapper,
  cacheImages,
  getDateText,
  fileUriToBase64
};
