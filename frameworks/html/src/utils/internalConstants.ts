import {colorize, grayscale, assistColorBlind} from "@cloudinary/base/actions/effect";
import {vectorize, pixelate, blur} from "@cloudinary/base/actions/effect";
import {Transformation} from "@cloudinary/base/transformation/Transformation";
import {pad, crop, fill} from "@cloudinary/base/actions/resize";
import {Background} from "@cloudinary/base/qualifiers/background";
import {compass} from "@cloudinary/base/qualifiers/gravity";
import {northEast} from "@cloudinary/base/qualifiers/compass";
import {format, quality} from "@cloudinary/base/actions/delivery";
import {auto, svg} from "@cloudinary/base/qualifiers/format";
import {VideoCodec} from "@cloudinary/base/qualifiers/videoCodec";
import {videoCodec} from "@cloudinary/base/actions/transcode";

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
    'ogv': 'ogg'
};

/**
 * Video codec types
 */
export const VIDEO_CODEC_TYPE = {
    'auto': videoCodec(VideoCodec.auto()),
    'h264': videoCodec(VideoCodec.h264()),
    'h265': videoCodec(VideoCodec.h265()),
    'proRes': videoCodec(VideoCodec.proRes()),
    'theora': videoCodec(VideoCodec.theora()),
    'vp8': videoCodec(VideoCodec.vp8()),
    'vp9': videoCodec(VideoCodec.vp9()),
};