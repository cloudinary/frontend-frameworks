import { UnionToIntersection } from './transformationTypes/helpers';
import { Background } from './transformationTypes/background';
import { Effect } from './transformationTypes/effect';
import { ImageFormat } from './transformationTypes/format';
import { Quality } from './transformationTypes/quality';
import { HeightOption, Resize, WidthOption } from './transformationTypes/resize';
import { Rotate } from './transformationTypes/rotate';
import { RoundCorners } from './transformationTypes/roundCorners';

type ResizeProps =
  | {
      height?: HeightOption;
      width?: WidthOption;
    }
  | {
      resize?: Resize;
    };

export type TransformationProps = {
  quality?: Quality;
  format?: ImageFormat;
  removeBackground?: boolean | 'fineEdges';
  effects?: Effect[];
  background?: Background;
  rotate?: Rotate;
  roundCorners?: RoundCorners;
} & ResizeProps;

type PropsTransformationWithNonStandardHandling = 'removeBackground';

export type ParseTransformationProps = Partial<UnionToIntersection<TransformationProps>>;

export type TransformationNameToParser = {
  [Key in keyof Omit<ParseTransformationProps, PropsTransformationWithNonStandardHandling>]-?: (
    value: Required<ParseTransformationProps>[Key]
  ) => string;
};
