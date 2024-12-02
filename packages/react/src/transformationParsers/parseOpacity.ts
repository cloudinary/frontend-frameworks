import { Opacity } from '../transformationTypes/opacity';

export const parseOpacity = (opacity: Opacity): `o_${string}` => `o_${opacity}`;
