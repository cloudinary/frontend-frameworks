type CompassPosition =
  | 'north'
  | 'northWest'
  | 'northEast'
  | 'south'
  | 'southWest'
  | 'southEast'
  | 'west'
  | 'east'
  | 'center';

type DetectionAlgorithm = 'face' | 'faces' | 'advancedFace' | 'advancedFaces' | 'advancedEyes';

type SpecialPosition = { mode: 'special'; } & ({
  position: 'decomposeTile' | 'liquid' | 'ocrText';
} | {
  position: 'custom';
  positionFallback?: DetectionAlgorithm;
} | {
  position: DetectionAlgorithm;
  positionFallback?: CompassPosition;
} | {
  position: 'xy';
  x: number;
  y: number;
});

type Object = {
  mode: 'object';
  focus: string;
}

type Auto = 'auto' | {
  mode: 'auto';
  algorithm?: 'subject' | 'classic';
  /**
   * @default faces
   */
  focus?: string | string[];
  /**
   * @description 0 - 100
   */
  thumbAggressiveness?: number;
  /**
   *@default on
   */
  ruleOfThirds?: 'on' | 'off';
};

type ClippingPath = {
  mode: 'clippingPath',
  focus: string;
};

type Region = {
  mode: 'region';
  focus: string;
  height: number;
  width: number;
};

type TrackPerson = {
  mode: 'trackPerson';
  focus: string;
  /**
   * @default east
   */
  position?: CompassPosition;
};

export type Gravity =
  | CompassPosition
  | ClippingPath
  | Region
  | TrackPerson
  | Auto
  | SpecialPosition
  | Object;
