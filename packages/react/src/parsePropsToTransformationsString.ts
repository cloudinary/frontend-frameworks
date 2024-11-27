import { Imagev3Props, TransformationPropsKey, TransformationPropsKeyToParser } from './types';

export const parsePropsToTransformationsString = (
  transformationPropsKeyToParser: TransformationPropsKeyToParser,
  props: Imagev3Props
): string => {
  const isTransformationPropName = (key: keyof Imagev3Props): key is TransformationPropsKey =>
    key !== 'src' && key !== 'alt' && key !== 'cloudName';
  const transformationPropKeys = (Object.keys(props) as (keyof Imagev3Props)[]).filter(
    isTransformationPropName
  );

  const transformationList = transformationPropKeys.map((transformationName) => {
    const transformationValue = props[transformationName];
    return transformationPropsKeyToParser[transformationName](transformationValue);
  });

  return transformationList.join('/');
};
