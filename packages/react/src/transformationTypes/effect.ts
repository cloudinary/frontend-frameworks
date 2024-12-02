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

export type Effect = Sepia | BackgroundRemoval | Fade | Gamma | Grayscale | Light;
