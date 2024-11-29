type SepiaEffect = {
  type: 'sepia';
  level?: number;
};

type BackgroundRemovalEffect = {
  type: 'backgroundRemoval';
  mode?: 'fineEdges';
};

export type Effect = Array<SepiaEffect | BackgroundRemovalEffect>;
