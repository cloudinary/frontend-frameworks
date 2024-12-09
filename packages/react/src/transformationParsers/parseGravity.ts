import { Gravity } from '../transformationTypes/gravity';

type SimpleGravity = Gravity extends infer GravityValue ? GravityValue extends string ? GravityValue : never : never;

// FIXME fill in missing gravity parsing
export const parseGravity = (gravity: Gravity) => {
  const camelCaseToSnakeCase = <Str extends string>(str: Str) => str.replace(/([A-Z]{1})/g, (value) => `_${value.toLowerCase()}`);
  const simpleGravityParser = <G extends SimpleGravity>(gravity: G): `g_${string}` => `g_${camelCaseToSnakeCase(gravity)}`;

  const gravityToUrlComponent = {
    auto: simpleGravityParser,
    center: simpleGravityParser,
    north: simpleGravityParser,
    northWest: simpleGravityParser,
    northEast: simpleGravityParser,
    east: simpleGravityParser,
    south: simpleGravityParser,
    southWest: simpleGravityParser,
    southEast: simpleGravityParser,
    west: simpleGravityParser
  } satisfies Record<SimpleGravity, (gravity: SimpleGravity) => `g_${string}`>;

  if (typeof gravity === 'string') {
    return gravityToUrlComponent[gravity](gravity);
  }

  switch (gravity.mode) {
    case 'special':
      if (gravity.position === 'liquid') {
        return 'g_liquid';
      }
      return '';
    case 'object':
      return `g_${gravity.focus}`;
    case 'auto':
      return '';
    case 'clippingPath':
      return '';
    case 'region':
      return '';
    case 'trackPerson':
      return '';
  }

  return 'g_auto';
};
