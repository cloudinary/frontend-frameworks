import { Quality } from '../types';

export const parseQuality = (quality: Quality): `q_${string}` => `q_${quality}`;
