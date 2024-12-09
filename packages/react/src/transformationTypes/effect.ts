// FIXME image only
type Sepia = {
  type: 'sepia';
  level?: number;
};
// FIXME image only
type BackgroundRemoval = {
  type: 'backgroundRemoval';
  mode?: 'fineEdges';
};

type Fade = {
  type: 'fade';
  duration: number;
}

type Gamma = {
  type: 'gamma';
  /**
   * @description -50 to 150
   */
  duration: number;
}
// FIXME image only
type Grayscale = {
  type: 'grayscale'
}

type Light = {
  type: 'light';
  /**
   * @default 30
   */
  intensity?: number;
}

type Negate = {
  type: 'negate';
}

type Noise = {
  type: 'noise';
  /**
   * @description 0 - 100
   */
  level: number;
}

type Pixelate = {
  type: 'pixelate';
  /**
   * @description 1 - 200
   * @default algorithm based
   */
  squareSize?: number;
}

type Blur = {
  type: 'blur' | 'blurFaces';
  /**
   * @description 1 to 2000
   */
  strength?: number
}

type Auto = {
  type: 'autoBrightness' | 'autoColor' | 'autoContrast';
  /**
   * @description 0 to 100
   * @default 100
   */
  blendPercentage?: number;
}

type AutoColor = {
  type: 'autoColor';

}

export type Effect =
  | Sepia
  | BackgroundRemoval
  | Fade
  | Gamma
  | Grayscale
  | Light
  | Negate
  | Noise
  | Pixelate
  | Blur
  | Auto;
