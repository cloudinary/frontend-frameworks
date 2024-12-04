import { Duration } from '../transformationTypes/duration';

export const parseDuration = (duration: Duration): `du_${string}` => {
  if (typeof duration === 'number') {
    return `du_${duration}`;
  }
  return `du_${duration.replace('%', 'p')}`;
}
