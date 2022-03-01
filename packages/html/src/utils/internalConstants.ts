import {colorize, grayscale, assistColorBlind} from "@cloudinary/url-gen/actions/effect";
import {vectorize, pixelate, blur} from "@cloudinary/url-gen/actions/effect";
import {Transformation} from "@cloudinary/url-gen/transformation/Transformation";
import {pad, crop, fill} from "@cloudinary/url-gen/actions/resize";
import {Background} from "@cloudinary/url-gen/qualifiers/background";
import {compass} from "@cloudinary/url-gen/qualifiers/gravity";
import {northEast} from "@cloudinary/url-gen/qualifiers/compass";
import {format, quality} from "@cloudinary/url-gen/actions/delivery";
import {auto, svg} from "@cloudinary/url-gen/qualifiers/format";
import {VideoCodec} from "@cloudinary/url-gen/qualifiers/videoCodec";
import {videoCodec} from "@cloudinary/url-gen/actions/transcode";

/**
 * Predefined accessibility transformations
 * @const {Object} Cloudinary.ACCESSIBILITY_MODES
 */
export const ACCESSIBILITY_MODES = {
    'darkmode': colorize(70).color('black'),
    'brightmode': colorize(40).color('white'),
    'monochrome': grayscale(),
    'colorblind': assistColorBlind()
};

/**
 * Predefined vectorize placeholder transformation
 */
export const VECTORIZE =
    new Transformation()
        .effect(vectorize())
        .delivery(quality('auto'))
        .delivery(format(svg()));

/**
 * Predefined pixelate placeholder transformation
 */
export const PIXELATE =
    new Transformation()
        .effect(pixelate())
        .delivery(quality('auto'))
        .delivery(format(auto()));

/**
 * Predefined blur placeholder transformation
 */
export const BLUR =
    new Transformation()
        .effect(blur(2000))
        .delivery(quality('auto'))
        .delivery(format(auto()));

/**
 * Predefined predominant color placeholder transformation
 */
export const PREDOMINANT_COLOR_TRANSFORM =
    new Transformation()
        .resize(pad('iw_div_2').aspectRatio(1).background(Background.auto()))
        .resize(crop(1,1).gravity(compass(northEast())))
        .resize(fill().height('ih').width('iw'))
        .delivery(quality('auto'))
        .delivery(format(auto()));

/**
 * Predefined placeholder image options
 */
export const PLACEHOLDER_IMAGE_OPTIONS = {
    'vectorize': VECTORIZE,
    'pixelate': PIXELATE,
    'blur': BLUR,
    'predominant-color': PREDOMINANT_COLOR_TRANSFORM
};

/**
 * transparent gif
 */
export const singleTransparentPixel = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';


/**
 * Convert common video file extensions to mime types
 * Most other common video file extensions have an identical mime type so do not need conversion.
 */
export const VIDEO_MIME_TYPES = {
    'flv': 'x-flv',
    '3gp': '3gpp',
    'mov': 'quicktime',
    'mpg': 'mpeg',
    'avi': 'x-msvideo',
    'wmv': 'x-ms-wmv',
    'ogv': 'ogg',
    'webm' : 'webm',
    'mp4' : 'mp4',
};
