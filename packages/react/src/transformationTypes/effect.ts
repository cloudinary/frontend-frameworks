// FIXME image only
type Sepia = {
  type: 'sepia';
  level?: number;
};
// FIXME image only
type BackgroundRemoval = {
  type: 'removeBackground';
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
  level: number;
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

export type ImageEffect =
  | Sepia
  | BackgroundRemoval
  | Gamma
  | Grayscale
  | Light
  | Negate
  | Pixelate
  | Blur
  | Auto;

export type VideoEffect =
  | Fade
  | Gamma
  | Noise
  | Blur;

export type AnyEffect = ImageEffect | VideoEffect;
