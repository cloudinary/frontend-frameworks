import React from 'react'

// Detect if this project was created via create-cloudinary-react CLI
function getCLIFeatureCode(): string {
  if (typeof process !== 'undefined' && process.env) {
    if (process.env.CLOUDINARY_SOURCE === 'cli' || process.env.CLD_CLI === 'true') {
      return 'B'; // CLI feature code
    }
  }
  return '0'; // Default (no specific feature)
}


export const SDKAnalyticsConstants = {
  sdkSemver: 'PACKAGE_VERSION_INJECTED_DURING_BUILD',
  techVersion: React.version,
  sdkCode: 'J',
  feature: getCLIFeatureCode()
};
