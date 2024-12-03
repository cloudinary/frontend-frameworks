import { ParseTransformationProps, TransformationNameToParser } from './types';

export const parsePropsToTransformationString = (
  transformationPropsKeyToParser: TransformationNameToParser,
  transformationProps: ParseTransformationProps
): string => {
  const transformationPropKeys = Object.keys(transformationProps) as (keyof ParseTransformationProps)[];

  const transformationStringList = transformationPropKeys
    .map((transformationName) => {
      if (transformationName in transformationProps) {
        if (transformationProps[transformationName] === undefined) {
          return undefined;
        }

        switch (transformationName) {
          case 'quality':
            return transformationPropsKeyToParser.quality(transformationProps[transformationName]);
          case 'format':
            return transformationPropsKeyToParser.format(transformationProps[transformationName]);
          case 'background':
            return transformationPropsKeyToParser.background(transformationProps[transformationName]);
          case 'effects':
            return transformationPropsKeyToParser.effects(transformationProps[transformationName]);
          case 'removeBackground':
            if (transformationProps.removeBackground) {
              return transformationPropsKeyToParser.effects([
                transformationProps.removeBackground === 'fineEdges'
                  ? {
                    type: 'backgroundRemoval',
                    mode: 'fineEdges'
                  }
                  : { type: 'backgroundRemoval' }
              ]);
            }

            return undefined;
          case 'width':
            return transformationPropsKeyToParser.width(transformationProps[transformationName]);
          case 'height':
            return transformationPropsKeyToParser.height(transformationProps[transformationName]);
          case 'resize':
            return transformationPropsKeyToParser.resize(transformationProps[transformationName]);
          case 'roundCorners':
            return transformationPropsKeyToParser.roundCorners(transformationProps[transformationName]);
          case 'opacity':
            return transformationPropsKeyToParser.opacity(transformationProps[transformationName]);
          case 'rotate':
            return transformationPropsKeyToParser.rotate(transformationProps[transformationName]);
        }
      }

      return undefined;
    })
    .filter(Boolean);

  return transformationStringList.join('/');
};
