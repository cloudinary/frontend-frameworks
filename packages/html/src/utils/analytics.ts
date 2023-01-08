import {AnalyticsOptions} from "../types";

export const getAnalyticsOptions = (analyticsOptions?: AnalyticsOptions) => {
    return {
        ...analyticsOptions && {
            trackedAnalytics: {
                sdkCode: analyticsOptions.sdkCode,
                sdkSemver: analyticsOptions.sdkSemver,
                techVersion: analyticsOptions.techVersion,
            }
        }
    }
}
