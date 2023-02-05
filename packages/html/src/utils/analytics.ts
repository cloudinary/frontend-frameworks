import {BaseAnalyticsOptions, AnalyticsOptions, Features} from "../types";

export const getAnalyticsOptions = (options?: BaseAnalyticsOptions, features: void | Features = {}): AnalyticsOptions => {
    return options ? {
        trackedAnalytics: {
            sdkCode: options.sdkCode,
            sdkSemver: options.sdkSemver,
            techVersion: options.techVersion,
            ...features
        }
    } : null
}
