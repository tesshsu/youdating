/* eslint-disable no-undef */
import Constants from 'expo-constants';

const ENVS = {
  BASE: {
    APP_NAME: 'You\'s',
    GOOGLE_API_KEY: 'AIzaSyAOeGj8aXNwCY52E8ItcNtch8WYTXRk2GE',
    FACEBOOK_APP_ID: '862552420923956',
    FACEBOOK_APP_NAME: 'Yous APP',
    AWS_BUCKET_URL: 'https://yous-app-data-backup.s3.eu-west-3.amazonaws.com'
  },
  DEV: {
    ENV: 'DEV',
    //API_URL: 'http://15.188.195.163:8080',
	API_URL: 'https://api.yousdating.com',
    SLACK_HOOK_URL: 'https://hooks.slack.com/services/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'
  },
  STAGING: {
    ENV: 'STAGING',
	//API_URL: 'http://192.168.0.42:8080',
	API_URL: 'https://api.yousdating.com',
    SLACK_HOOK_URL: 'https://hooks.slack.com/services/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'
  },
};

let currentEnv;

if (__DEV__) {
  currentEnv = 'DEV';
} else if (Constants.manifest.releaseChannel === 'default') {
  currentEnv = 'STAGING';
}

if (!ENVS[currentEnv]) {
  throw new Error(`No such ENV: '${currentEnv}'`);
}

export default {
  ...ENVS.BASE,
  ...ENVS[currentEnv]
};
