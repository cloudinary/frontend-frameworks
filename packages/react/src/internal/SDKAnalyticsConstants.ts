import React from 'react'

// Detect if this project was created via create-cloudinary-react CLI (Integrations)
function isCLI(): boolean {
  if (typeof process !== 'undefined' && process.env) {
    return process.env.CLOUDINARY_SOURCE === 'cli' || process.env.CLD_CLI === 'true';
  }
  return false;
}

// When CLI: use Algorithm B with Product B (Integrations) and sdkCode H (React CLI). Otherwise React SDK: sdkCode J.
const isCLIDetected = isCLI();

export const SDKAnalyticsConstants = {
  sdkSemver: 'PACKAGE_VERSION_INJECTED_DURING_BUILD',
  techVersion: React.version,
  sdkCode: isCLIDetected ? 'H' : 'J',
  ...(isCLIDetected && { product: 'B' as const })
};
