import {CloudinaryImage} from "@cloudinary/base/assets/CloudinaryImage";

export type plugin = (element: HTMLImageElement, cloudinaryImage: CloudinaryImage, htmlPluginState: htmlPluginState) => Promise<string | void>;

export type plugins = plugin[];

export type accessibilityMode = 'darkmode' | 'brightmode' | 'monochrome' | 'colorblind';

export type placeholderMode = 'vectorize' | 'pixelate' | 'blur' | 'predominant-color';

export type htmlPluginState = { cleanupCallbacks: Function[], pluginEventSubscription: Function[] };
