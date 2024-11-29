import React, { forwardRef } from 'react';
import { type CloudinaryImage as UrlGenCloudinaryImage } from '@cloudinary/url-gen/assets/CloudinaryImage';
import { TransformationProps, TransformationNameToParser } from './types';
import { parseCloudinaryUrlToParts } from './parseCloudinaryUrlToParts';
import { parsePropsToTransformationString } from './parsePropsToTransformationString';
import { parseFormat } from './transformationParsers/parseFormat';
import { parseQuality } from './transformationParsers/parseQuality';
import { parseWidth } from './transformationParsers/parseWidth';
import { parseHeight } from './transformationParsers/parseHeight';
import { parseEffects } from './transformationParsers/parseEffects';
import { parseBackground } from './transformationParsers/parseBackground';
import { createParseResize } from './transformationParsers/parseResize';
import { parseRotate } from './transformationParsers/parseRotate';
import { parseGravity } from './transformationParsers/parseGravity';
import { parseAspectRatio } from './transformationParsers/parseAspectRatio';

// import { parseResize } from './transformationParsers/parseResize';

type Imagev3Props = {
  cloudName: string;
  src: string;
  alt: string;
} & TransformationProps;

interface Imagev2Props {
  cldImg: UrlGenCloudinaryImage;
}

export type CldImageProps = Imagev3Props | Imagev2Props;

export const CloudinaryImg = forwardRef<HTMLImageElement, CldImageProps>((props, ref) => {
  if ('cldImg' in props) {
    const { cldImg, ...rest } = props;
    return <img src={cldImg.toURL()} {...rest} ref={ref} />;
  }

  const transformationPropsKeyToParser = {
    format: parseFormat,
    quality: parseQuality,
    background: parseBackground,
    width: parseWidth,
    height: parseHeight,
    effects: parseEffects,
    resize: createParseResize({
      parseHeight,
      parseAspectRatio,
      parseGravity,
      parseWidth
    }),
    rotate: parseRotate
  } satisfies TransformationNameToParser;

  const { baseCloudUrl, assetPath } = parseCloudinaryUrlToParts(props.src);
  const transformationString = parsePropsToTransformationString(transformationPropsKeyToParser, props);

  return <img src={`${baseCloudUrl}/${transformationString}/${assetPath}`} ref={ref} />;
});
