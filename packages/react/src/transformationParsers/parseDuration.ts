import { Duration } from '../transformationTypes/duration';

// FIXME verify whether duration du_ accepts `%` and not only `p`
export const parseDuration = (duration: Duration): `du_${string}` => `du_${duration}`;
