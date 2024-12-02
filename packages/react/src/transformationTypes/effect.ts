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

export type Effect = Sepia | BackgroundRemoval | Fade;
