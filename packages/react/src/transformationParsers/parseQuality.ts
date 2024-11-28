import { Quality } from '../transformationTypes/quality';

export const parseQuality = (quality: Quality): `q_${string}` => `q_${quality}`;
