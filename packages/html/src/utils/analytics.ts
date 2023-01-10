import {AnalyticsOptions} from "../types";

export const getAnalyticsOptions = (options?: AnalyticsOptions) => {
    return options ? {
        trackedAnalytics: {
            sdkCode: options.sdkCode,
            sdkSemver: options.sdkSemver,
            techVersion: options.techVersion,
        }
    } : null
}
