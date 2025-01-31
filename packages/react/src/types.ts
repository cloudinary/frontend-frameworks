export type UnionToIntersection<U> = (U extends any ? (x: U) => void : never) extends (x: infer I) => void ? I : never;

export type TransformationNameToParser<Props, ExcludedKeys> = {
  [Key in Exclude<keyof Props, ExcludedKeys>]-?: (
    value: Required<Props>[Key]
  ) => string;
};

export type TransformationMap<Props, ExcludedTransformations extends keyof UnionToIntersection<Props> = never> = TransformationNameToParser<Partial<UnionToIntersection<Props>>, ExcludedTransformations>
