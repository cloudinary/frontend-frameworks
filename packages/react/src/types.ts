import { UnionToIntersection } from './transformationTypes/helpers';
import { Background } from './transformationTypes/background';
import { Effect } from './transformationTypes/effect';
import { ImageFormat, VideoFormat } from './transformationTypes/format';
import { Quality } from './transformationTypes/quality';
import { HeightOption, Resize, WidthOption } from './transformationTypes/resize';
import { Rotate } from './transformationTypes/rotate';
import { RoundCorners } from './transformationTypes/roundCorners';
import { Opacity } from './transformationTypes/opacity';

type ResizeProps =
  | {
      height?: HeightOption;
      width?: WidthOption;
    }
  | {
      resize?: Resize;
    };

export type ImageTransformationProps = {
  quality?: Quality;
  format?: ImageFormat;
  removeBackground?: boolean | 'fineEdges';
  effects?: Effect[];
  background?: Background;
  rotate?: Rotate;
  roundCorners?: RoundCorners;
  opacity?: Opacity;
} & ResizeProps;

export type VideoTransformationProps = {
  quality?: Quality;
  format?: VideoFormat;
  height?: HeightOption;
  width?: WidthOption;
  // removeBackground?: boolean | 'fineEdges';
  // effects?: Effect[];
  // background?: Background;
  // rotate?: Rotate;
  // roundCorners?: RoundCorners;
  opacity?: Opacity;
};

export type ImageParseTransformationProps = Partial<UnionToIntersection<ImageTransformationProps>>;
export type VideoParseTransformationProps = Partial<UnionToIntersection<VideoTransformationProps>>;

type TransformationNameToParser<Props> = {
  [Key in keyof Props]-?: (
    value: Required<Props>[Key]
  ) => string;
};

export type ImageTransformationNameToParser = TransformationNameToParser<ImageParseTransformationProps>;
export type VideoTransformationNameToParser = TransformationNameToParser<VideoParseTransformationProps>;

export type AllTransformationNameToParser = ImageTransformationNameToParser | VideoTransformationNameToParser;
