import { HeightOption } from '../transformationTypes/resize';

// FIXME move it inside of parseResize
export const parseHeight = (height: HeightOption) => `h_${height}`;
