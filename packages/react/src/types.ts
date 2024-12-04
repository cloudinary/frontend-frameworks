import { HeightOption, Resize, WidthOption } from './transformationTypes/resize';

export type UnionToIntersection<U> = (U extends any ? (x: U) => void : never) extends (x: infer I) => void ? I : never;

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
