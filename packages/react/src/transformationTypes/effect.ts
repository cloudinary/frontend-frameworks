type Sepia = {
  type: 'sepia';
  level?: number;
};

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

export type Effect =
  | Sepia
  | BackgroundRemoval
  | Fade
  | Gamma
  | Grayscale
  | Light
  | Negate
  | Noise
  | Pixelate;
