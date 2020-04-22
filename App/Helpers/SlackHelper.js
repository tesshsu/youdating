import axios from 'axios';

import ENV from '../environment';

export const sendAlertToSlack = err => axios
  .post(ENV.SLACK_HOOK_URL, { text: err.toString() });
