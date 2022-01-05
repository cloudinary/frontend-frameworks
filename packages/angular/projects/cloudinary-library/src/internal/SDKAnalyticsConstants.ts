import {VERSION} from '@angular/core';
import {APP_VERSION} from '../lib/version';

/**
 * Used by SDK Analytics as a token (?a_{token})
 */
export const SDKAnalyticsConstants = {
  sdkSemver: APP_VERSION,
  techVersion: VERSION.full,
  sdkCode: 'K'
};
