import { WidthOption } from '../transformationTypes/resize';

// FIXME move it inside of parseResize
export const parseWidth = (width: WidthOption) => `w_${width}`;
