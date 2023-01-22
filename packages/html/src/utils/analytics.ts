import {AnalyticsOptions, FeaturedAnalyticsOptions, Features} from "../types";

export const getAnalyticsOptions = (options?: AnalyticsOptions, features: Features = {}): FeaturedAnalyticsOptions => {
    return options ? {
        trackedAnalytics: {
            sdkCode: options.sdkCode,
            sdkSemver: options.sdkSemver,
            techVersion: options.techVersion,
            ...features
        }
    } : null
}
