import { Duration } from '../transformationTypes/duration';

export const parseDuration = (duration: Duration) => `du_${String(duration).replace('%', 'p')}`;
