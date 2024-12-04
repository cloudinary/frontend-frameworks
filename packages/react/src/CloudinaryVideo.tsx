import React, { forwardRef } from 'react';
import { type CloudinaryVideo as UrlGenCloudinaryVideo } from '@cloudinary/url-gen/assets/CloudinaryVideo';
import { parseCloudinaryUrlToParts } from './parseCloudinaryUrlToParts';
import { parseFormat } from './transformationParsers/parseFormat';
import { parseQuality } from './transformationParsers/parseQuality';
import { parseWidth } from './transformationParsers/parseWidth';
import { parseHeight } from './transformationParsers/parseHeight';
import { parseOpacity } from './transformationParsers/parseOpacity';
import {
  parsePropsToTransformationString
} from './parsePropsToTransformationString';
import { parseRotate } from './transformationParsers/parseRotate';
import { parseRoundCorners } from './transformationParsers/parseRoundCorners';
import { parseBackground } from './transformationParsers/parseBackground';
import { Quality } from './transformationTypes/quality';
import { VideoFormat } from './transformationTypes/format';
import { HeightOption, WidthOption } from './transformationTypes/resize';
import { Background } from './transformationTypes/background';
import { Rotate } from './transformationTypes/rotate';
import { RoundCorners } from './transformationTypes/roundCorners';
import { Opacity } from './transformationTypes/opacity';
import { TransformationMap } from './types';

export type VideoTransformationProps = {
  quality?: Quality;
  format?: VideoFormat;
  height?: HeightOption;
  width?: WidthOption;
  // removeBackground?: boolean | 'fineEdges';
  // effects?: Effect[];
  background?: Background;
  rotate?: Rotate;
  roundCorners?: RoundCorners;
  opacity?: Opacity;
};

type VideoV3Props = {
  src: string;
  alt: string;
} & VideoTransformationProps;

interface VideoV2Props {
  cldVid: UrlGenCloudinaryVideo;
}

export type CloudinaryVideoProps = VideoV3Props | VideoV2Props;

export const CloudinaryVideo = forwardRef<HTMLImageElement, CloudinaryVideoProps>((props, ref) => {
  if ('cldVid' in props) {
    const { cldVid, ...rest } = props;
    return <img src={cldVid.toURL()} {...rest} ref={ref} />;
  }

  const transformationMap = {
    format: parseFormat,
    quality: parseQuality,
    background: parseBackground,
    width: parseWidth,
    height: parseHeight,
    // effects: parseEffects,
    // resize: createParseResize({
    //   parseHeight,
    //   parseAspectRatio,
    //   parseGravity,
    //   parseWidth,
    //   parseBackground,
    //   parseIgnoreAspectRatio,
    //   parseZoom
    // }),
    rotate: parseRotate,
    roundCorners: parseRoundCorners,
    opacity: parseOpacity
  } satisfies TransformationMap<VideoTransformationProps>;
  const { baseCloudUrl, assetPath } = parseCloudinaryUrlToParts(props.src);
  const { src, alt, children, ...rest } = props
  const transformationString = parsePropsToTransformationString(rest, transformationMap);

  return <img src={`${baseCloudUrl}/${transformationString}/${assetPath}`} ref={ref} />;
});
