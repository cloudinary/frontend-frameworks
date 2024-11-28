import { UnionToIntersection } from './transformationTypes/helpers';
import { BackgroundOption } from './transformationTypes/background';
import { Effect } from './transformationTypes/effect';
import { ImageFormat } from './transformationTypes/format';
import { Quality } from './transformationTypes/quality';
import { ResizeProps } from './transformationTypes/resize';
import { Rotate } from './transformationTypes/rotate';

export type TransformationProps = {
  quality?: Quality;
  format?: ImageFormat;
  removeBackground?: boolean | 'fineEdges';
  effects?: Effect[];
  background?: BackgroundOption;
  rotate?: Rotate;
} & ResizeProps;

type PropsTransformationWithNonStandardHandling = 'removeBackground';

export type ParseTransformationProps = Partial<UnionToIntersection<TransformationProps>>;

export type TransformationNameToParser = {
  [Key in keyof Omit<ParseTransformationProps, PropsTransformationWithNonStandardHandling>]-?: (
    value: Required<ParseTransformationProps>[Key]
  ) => string;
};
