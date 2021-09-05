import {CloudinaryImage} from "@cloudinary/url-gen/assets/CloudinaryImage";
import {VideoCodecAction} from "@cloudinary/url-gen/actions/transcode/VideoCodecAction";

export type Plugin = (element: HTMLImageElement|HTMLVideoElement, cloudinaryImage: CloudinaryImage, htmlPluginState?: HtmlPluginState) => Promise<string | void>;

export type Plugins = Plugin[];

export type AccessibilityMode = 'darkmode'|'brightmode'|'monochrome'|'colorblind';

export type PlaceholderMode = 'vectorize' | 'pixelate' | 'blur' | 'predominant-color';

export type HtmlPluginState = { cleanupCallbacks: Function[], pluginEventSubscription: Function[] };

export type VideoSources = {type: VideoType, codecs: Array<string>, transcode: VideoCodecAction}[] | undefined;

export type VideoType = 'flv'|'3gp'|'mov'|'mpg'|'avi'|'wmv'|'ogv'|string;

export type PictureSources = {minWidth?: number, maxWidth?: number, image: CloudinaryImage, sizes?: string}[];

export type PictureSource  = {minWidth?: number, maxWidth?: number, image: CloudinaryImage, sizes?: string};
