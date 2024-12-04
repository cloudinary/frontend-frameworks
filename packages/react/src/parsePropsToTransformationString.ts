export const parsePropsToTransformationString = <Props extends Record<string, any>>(
  transformationProps: Props,
  transformationMap: { [K in keyof Props]: (value: Exclude<Props[K], undefined>) => string}
): string => {
  const transformationPropKeys = Object.keys(transformationProps) as (keyof typeof transformationProps)[];

  const transformationStringList = transformationPropKeys
    .map((transformationName) => {
      if (transformationName in transformationProps) {
        // FIXME this type guard seems to be too much for TS
        if (transformationProps[transformationName] === undefined) {
          return undefined;
        }

        return transformationMap[transformationName](transformationProps[transformationName])
      }

      return undefined;
    })
    .filter(Boolean);

  return transformationStringList.join('/');
};
