import { RoundCorners } from '../transformationTypes/roundCorners';

export const parseRoundCorners = (roundCorners: RoundCorners): `r_${string}` => {
  if (typeof roundCorners === 'number') {
    return `r_${roundCorners}`;
  }

  if (roundCorners === 'maximum') {
    return 'r_max';
  }

  return `r_:${roundCorners.join(':')}`
}
