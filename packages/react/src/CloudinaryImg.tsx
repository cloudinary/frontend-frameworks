import React, { ForwardedRef, forwardRef } from 'react';
import { type CloudinaryImage as UrlGenCloudinaryImage } from '@cloudinary/url-gen/assets/CloudinaryImage';
import {
  ResizeProps, TransformationMap
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
import { parseRemoveBackground } from './transformationParsers/parseRemoveBackground';
import { Quality } from './transformationTypes/quality';
import { ImageFormat } from './transformationTypes/format';
import { RemoveBackground } from './transformationTypes/removeBackground';
import { Effect } from './transformationTypes/effect';
import { Background } from './transformationTypes/background';
import { Rotate } from './transformationTypes/rotate';
import { RoundCorners } from './transformationTypes/roundCorners';
import { Opacity } from './transformationTypes/opacity';

export type ImageTransformationProps = {
  quality?: Quality;
  format?: ImageFormat;
  removeBackground?: RemoveBackground;
  effects?: Effect[];
  background?: Background;
  rotate?: Rotate;
  roundCorners?: RoundCorners;
  opacity?: Opacity;
} & ResizeProps;

type ImageV3Props = {
  src: string;
  alt: string;
} & ImageTransformationProps;

interface ImageV2Props {
  cldImg: UrlGenCloudinaryImage;
}

export type CloudinaryImgProps = ImageV3Props | ImageV2Props;

export const CloudinaryImg = forwardRef(
  (props: CloudinaryImgProps, ref: ForwardedRef<typeof props extends ImageV2Props ? never : never>) => {
    if ('cldImg' in props) {
      const { cldImg, ...rest } = props;
      return <img src={cldImg.toURL()} {...rest} ref={ref} />;
    }
    const transformationMap = {
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
        parseWidth,
        parseBackground,
        parseIgnoreAspectRatio,
        parseZoom
      }),
      rotate: parseRotate,
      roundCorners: parseRoundCorners,
      opacity: parseOpacity,
      removeBackground: parseRemoveBackground(parseEffects)
    } satisfies TransformationMap<ImageTransformationProps>;
    const { baseCloudUrl, assetPath } = parseCloudinaryUrlToParts(props.src);
    const { src, alt, ...rest } = props;
    const transformationString = parsePropsToTransformationString(rest, transformationMap);

    return <img src={`${baseCloudUrl}/${transformationString}/${assetPath}`} ref={ref} />;
  });
