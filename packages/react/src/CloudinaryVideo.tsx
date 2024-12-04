import React, { forwardRef } from 'react';
import { type CloudinaryVideo as UrlGenCloudinaryVideo } from '@cloudinary/url-gen/assets/CloudinaryVideo';
import { VideoTransformationNameToParser, VideoTransformationProps } from './types';
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

  const transformationPropsKeyToParser = {
    format: parseFormat,
    quality: parseQuality,
    // background: parseBackground,
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
  } satisfies VideoTransformationNameToParser;
  const { baseCloudUrl, assetPath } = parseCloudinaryUrlToParts(props.src);
  const { src, alt, children, ...rest } = props
  const transformationString = parsePropsToTransformationString(rest, transformationPropsKeyToParser);

  return <img src={`${baseCloudUrl}/${transformationString}/${assetPath}`} ref={ref} />;
});
