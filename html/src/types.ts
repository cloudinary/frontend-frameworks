import {CloudinaryImage} from "@cloudinary/base/assets/CloudinaryImage";

export type plugins = ((element: HTMLImageElement, cloudinaryImage: CloudinaryImage, runningPlugins: Function[]) => string | Promise<string | void>)[];

export type plugin = (element: HTMLImageElement, cloudinaryImage: CloudinaryImage, runningPlugins: Function[]) => string | Promise<string | void>;

export type accessibilityMode = 'darkmode' | 'brightmode' | 'monochrome' | 'colorblind';
