import { HeightOption, Resize, WidthOption } from './transformationTypes/resize';
import { UnionToIntersection } from './transformationTypes/helpers';

export type ResizeProps =
  | {
      height?: HeightOption;
      width?: WidthOption;
    }
  | {
      resize?: Resize;
    };

export type TransformationNameToParser<Props> = {
  [Key in keyof Props]-?: (
    value: Required<Props>[Key]
  ) => string;
};

export type TransformationMap<Props> = TransformationNameToParser<Partial<UnionToIntersection<Props>>>
