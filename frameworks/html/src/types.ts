import {CloudinaryImage} from "@cloudinary/base/assets/CloudinaryImage";

export type Plugin = (element: HTMLImageElement, cloudinaryImage: CloudinaryImage, htmlPluginState?: HtmlPluginState) => Promise<string | void>;

export type Plugins = Plugin[];

export type AccessibilityMode = 'darkmode'|'brightmode'|'monochrome'|'colorblind';

export type PlaceholderMode = 'vectorize' | 'pixelate' | 'blur' | 'predominant-color';

export type HtmlPluginState = { cleanupCallbacks: Function[], pluginEventSubscription: Function[] };

export type VideoCodecType = 'auto'|'h264'|'h265'|'proRes'|'theora'|'vp8'|'vp9';

export type VideoSources = {type: VideoType, codecs: Array<string>, videoCodec: VideoCodecType}[] | undefined;

export type VideoType = 'flv'|'3gp'|'mov'|'mpg'|'avi'|'wmv'|'ogv'|string;
