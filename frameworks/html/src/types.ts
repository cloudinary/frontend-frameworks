import {CloudinaryImage} from "@cloudinary/base/assets/CloudinaryImage";

export type plugin = (element: HTMLImageElement, cloudinaryImage: CloudinaryImage, htmlPluginState?: htmlPluginState) => Promise<string | void>;

export type plugins = plugin[];

export type accessibilityMode = 'darkmode'|'brightmode'|'monochrome'|'colorblind';

export type placeholderMode = 'vectorize' | 'pixelate' | 'blur' | 'predominant-color';

export type htmlPluginState = { cleanupCallbacks: Function[], pluginEventSubscription: Function[] };

export type videoCodecType = 'auto'|'h264'|'h265'|'proRes'|'theora'|'vp8'|'vp9';

export type videoSources = {type: videoType, codecs: Array<string>, videoCodec: videoCodecType}[];

export type videoType = 'flv'|'3gp'|'mov'|'mpg'|'avi'|'wmv'|'ogv';
