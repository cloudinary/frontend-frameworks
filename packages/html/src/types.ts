import {CloudinaryImage} from "@cloudinary/url-gen/assets/CloudinaryImage";
import {VideoCodecAction} from "@cloudinary/url-gen/actions/transcode/VideoCodecAction";
import {
  ITrackedPropertiesThroughAnalytics
} from "@cloudinary/url-gen/sdkAnalytics/interfaces/ITrackedPropertiesThroughAnalytics";

export type Plugin = (element: HTMLImageElement|HTMLVideoElement, cloudinaryImage: CloudinaryImage, htmlPluginState?: HtmlPluginState, baseAnalyticsOptions?: BaseAnalyticsOptions) => Promise<PluginResponse>;

export type Plugins = Plugin[];

export type PluginResponse = 'canceled' | void | Features;

export type AccessibilityMode = 'darkmode'|'brightmode'|'monochrome'|'colorblind';

export type PlaceholderMode = 'vectorize' | 'pixelate' | 'blur' | 'predominant-color';

export type HtmlPluginState = { cleanupCallbacks: Function[], pluginEventSubscription: Function[] };

export type VideoSources = {type: VideoType, codecs: Array<string>, transcode: VideoCodecAction}[] | undefined;

export type VideoType = 'flv'|'3gp'|'mov'|'mpg'|'avi'|'wmv'|'ogv'|string;

export type PictureSources = {minWidth?: number, maxWidth?: number, image: CloudinaryImage, sizes?: string}[];

export type PictureSource  = {minWidth?: number, maxWidth?: number, image: CloudinaryImage, sizes?: string};

export type BaseAnalyticsOptions = {sdkSemver: string, techVersion: string, sdkCode: string};

export type AnalyticsOptions = Parameters<CloudinaryImage['toURL']>[0];

type FeatureNames = Omit<ITrackedPropertiesThroughAnalytics, 'sdkCode' | 'sdkSemver' | 'techVersion'>

export type Features = Partial<Record<keyof FeatureNames, boolean>>

export type VideoPoster = CloudinaryImage | 'auto';
