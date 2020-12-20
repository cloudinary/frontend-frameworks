import {colorize, grayscale, assistColorBlind} from "@cloudinary/base/actions/effect";
import {vectorize, pixelate, blur} from "@cloudinary/base/actions/effect";
import {Transformation} from "@cloudinary/base/transformation/Transformation";
import {pad, crop, fill} from "@cloudinary/base/actions/resize";
import {Background} from "@cloudinary/base/values/background";
import {compass} from "@cloudinary/base/values/gravity";
import {northEast} from "@cloudinary/base/values/gravity/qualifiers/compass/Compass";
import {format} from "@cloudinary/base/actions/delivery";
import {auto, svg} from "@cloudinary/base/values/format";

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
        .delivery(format(svg()));

/**
 * Predefined pixelate placeholder transformation
 */
export const PIXELATE =
    new Transformation()
        //@ts-ignore
        .effect(pixelate())
        .delivery(format(auto()));

/**
 * Predefined blur placeholder transformation
 */
export const BLUR =
    new Transformation()
        //@ts-ignore
        .effect(blur(2000))
        .delivery(format(auto()));

/**
 * Predefined predominant color placeholder transformation
 */
export const PREDOMINANT_COLOR_TRANSFORM =
    new Transformation()
        .resize(pad('iw_div_2').aspectRatio(1).background(Background.auto()))
        .resize(crop(1,1).gravity(compass(northEast())))
        .resize(fill().height('ih').width('iw'))
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
