export const parsePropsToTransformationString = <Props extends Record<string, any>>
  ({ transformationProps, transformationMap }: {
  transformationProps: Props,
  transformationMap: { [K in keyof Required<Props>]: (value: Exclude<Props[K], undefined>) => string}
}): string => {
  const transformationPropKeys = Object.keys(transformationProps) as (keyof typeof transformationProps)[];

  const transformationStringList: Array<string | undefined> = transformationPropKeys
    .map((transformationName): undefined | string => {
      // FIXME this type guard seems to be too much for TS
      if (transformationProps[transformationName] === undefined) {
        return undefined;
      }

      return transformationMap[transformationName](transformationProps[transformationName]);
    });

  return transformationStringList.filter(Boolean).join('/');
};
