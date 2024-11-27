import React, { forwardRef } from 'react';
import { type CloudinaryImage as UrlGenCloudinaryImage } from '@cloudinary/url-gen/assets/CloudinaryImage';
import { Imagev3Props, TransformationPropsKeyToParser } from './types';
import { parseCloudinaryUrlToParts } from './parseCloudinaryUrlToParts';
import { parsePropsToTransformationsString } from './parsePropsToTransformationsString';
import { parseFormat } from './transformationParsers/parseFormat';
import { parseQuality } from './transformationParsers/parseQuality';
import { parseRemoveBackground } from './transformationParsers/parseRemoveBackground';
import { parseWidth } from './transformationParsers/parseWidth';
import { parseHeight } from './transformationParsers/parseHeight';
import { parseEffects } from './transformationParsers/parseEffects';
import { parseBackground } from './transformationParsers/parseBackground';

// import { parseResize } from './transformationParsers/parseResize';

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
    removeBackground: parseRemoveBackground,
    format: parseFormat,
    quality: parseQuality,
    background: parseBackground,
    width: parseWidth,
    height: parseHeight,
    effects: parseEffects
    // resize: parseResize
  } satisfies TransformationPropsKeyToParser;

  const { baseCloudUrl, assetPath } = parseCloudinaryUrlToParts(props.src);
  const transformationString = parsePropsToTransformationsString(
    transformationPropsKeyToParser,
    props
  );

  return <img src={`${baseCloudUrl}/${transformationString}/${assetPath}`} ref={ref} />;
});
