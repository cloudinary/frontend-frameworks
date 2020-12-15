import {Effect} from "@cloudinary/base/actions/effect";
/**
 * Predefined accessibility transformations
 * @const {Object} Cloudinary.ACCESSIBILITY_MODES
 */
export const ACCESSIBILITY_MODES = {
    'darkmode': Effect.colorize(70).color('black'),
    'brightmode': Effect.colorize(40).color('white'),
    'monochrome': Effect.grayscale(),
    'colorblind': Effect.assistColorBlind()
};
