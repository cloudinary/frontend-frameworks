import React, { forwardRef } from 'react';
import { type CloudinaryImage as UrlGenCloudinaryImage } from '@cloudinary/url-gen/assets/CloudinaryImage';
import {
  TransformationMap
} from './types';
import { parseCloudinaryUrlToParts } from './parseCloudinaryUrlToParts';
import {
  parsePropsToTransformationString
} from './parsePropsToTransformationString';
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
import { parseIgnoreAspectRatio } from './transformationParsers/parseIgnoreAspectRatio';
import { parseZoom } from './transformationParsers/parseZoom';
import { parseRoundCorners } from './transformationParsers/parseRoundCorners';
import { parseOpacity } from './transformationParsers/parseOpacity';
import { Quality } from './transformationTypes/quality';
import { ImageFormat } from './transformationTypes/format';
import { RemoveBackground } from './transformationTypes/removeBackground';
import { Effect } from './transformationTypes/effect';
import { Background } from './transformationTypes/background';
import { Rotate } from './transformationTypes/rotate';
import { RoundCorners } from './transformationTypes/roundCorners';
import { Opacity } from './transformationTypes/opacity';
import { parseRemoveBackground } from './transformationParsers/parseRemoveBackground';
import { Resize } from './transformationTypes/resize';

type ImageTransformationProps = {
  quality?: Quality;
  format?: ImageFormat;
  removeBackground?: RemoveBackground;
  effects?: Effect[];
  background?: Background;
  rotate?: Rotate;
  roundCorners?: RoundCorners;
  opacity?: Opacity;
  resize?: Resize;
};

type ImageV3Props = {
  cldImg?: never
  src: string;
  alt: string;
  children?: never;
} & ImageTransformationProps;

interface ImageV2Props {
  src?: never;
  cldImg: UrlGenCloudinaryImage;
  children?: never;
}

export type CloudinaryImageProps = ImageV3Props | ImageV2Props;

export const CloudinaryImage = forwardRef<HTMLImageElement, CloudinaryImageProps>(
  (props, ref) => {
    if (props.cldImg) {
      const { cldImg, ...rest } = props;
      return <img src={cldImg.toURL()} {...rest} ref={ref} />;
    }
    const transformationMap = {
      format: parseFormat,
      quality: parseQuality,
      background: parseBackground,
      removeBackground: parseRemoveBackground,
      effects: parseEffects(parseRemoveBackground),
      resize: createParseResize({
        parseHeight,
        parseAspectRatio,
        parseGravity,
        parseWidth,
        parseBackground,
        parseIgnoreAspectRatio,
        parseZoom
      }),
      rotate: parseRotate,
      roundCorners: parseRoundCorners,
      opacity: parseOpacity
    } satisfies TransformationMap<ImageTransformationProps>;
    const { src, alt, children, cldImg, ...rest } = props;
    const { baseCloudUrl, assetPath } = parseCloudinaryUrlToParts(src);
    const transformationString = parsePropsToTransformationString({
      transformationProps: rest,
      transformationMap
    });

    return <img src={`${baseCloudUrl}/${transformationString}/${assetPath}`} alt={alt} ref={ref} />;
  });
