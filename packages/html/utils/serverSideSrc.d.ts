/**
 * Calculates the SSR src based on plugins
 * @param plugins The plugins array of plugins passed in by the user
 * @param serverCloudinaryImage {CloudinaryImage}
 * @return {string} return the src
 */
import { CloudinaryImage } from "@cloudinary/url-gen/assets/CloudinaryImage";
import { AnalyticsOptions, Plugins } from "../types.js";
export declare function serverSideSrc(plugins?: Plugins, serverCloudinaryImage?: CloudinaryImage, analyticsOptions?: AnalyticsOptions): string;
