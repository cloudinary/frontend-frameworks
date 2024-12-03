import { ImageFormat, VideoFormat } from '../transformationTypes/format';

export const parseFormat = (format: ImageFormat | VideoFormat) => `f_${format}`;
