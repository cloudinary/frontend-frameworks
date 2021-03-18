import type {CloudinaryImage} from "@cloudinary/base/assets/CloudinaryImage";
import type {ITranscodeAction} from "@cloudinary/base/actions/transcode";

export type Plugin = (element: HTMLImageElement|HTMLVideoElement, cloudinaryImage: CloudinaryImage, htmlPluginState?: HtmlPluginState) => Promise<string | void>;

export type Plugins = Plugin[];

export type AccessibilityMode = 'darkmode'|'brightmode'|'monochrome'|'colorblind';

export type PlaceholderMode = 'vectorize' | 'pixelate' | 'blur' | 'predominant-color';

export type HtmlPluginState = { cleanupCallbacks: Function[], pluginEventSubscription: Function[] };

export type VideoSources = {type: VideoType, codecs: Array<string>, transcode: ITranscodeAction}[] | undefined;

export type VideoType = 'flv'|'3gp'|'mov'|'mpg'|'avi'|'wmv'|'ogv'|string;
