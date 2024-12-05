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
import { Background } from './transformationTypes/background';
import { Rotate } from './transformationTypes/rotate';
import { RoundCorners } from './transformationTypes/roundCorners';
import { Opacity } from './transformationTypes/opacity';
import { TransformationMap } from './types';
import { Duration } from './transformationTypes/duration';
import { parseDuration } from './transformationParsers/parseDuration';
import { StartOffset } from './transformationTypes/startOffset';
import { parseStartOffset } from './transformationParsers/parseStartOffset';
import { VideoCodec } from './transformationTypes/videoCodec';
import { parseVideoCodec } from './transformationParsers/parseVideoCodec';
import { createParseResize } from './transformationParsers/parseResize';
import { parseAspectRatio } from './transformationParsers/parseAspectRatio';
import { parseGravity } from './transformationParsers/parseGravity';
import { parseIgnoreAspectRatio } from './transformationParsers/parseIgnoreAspectRatio';
import { parseZoom } from './transformationParsers/parseZoom';
import { RemoveBackground } from './transformationTypes/removeBackground';
import { parseEffects } from './transformationParsers/parseEffects';
import { Effect } from './transformationTypes/effect';
import { parseRemoveBackground } from './transformationParsers/parseRemoveBackground';
import { Resize } from './transformationTypes/resize';

export type VideoTransformationProps = {
  quality?: Quality;
  format?: VideoFormat;
  removeBackground?: RemoveBackground;
  effects?: Effect[];
  background?: Background;
  rotate?: Rotate;
  roundCorners?: RoundCorners;
  opacity?: Opacity;
  duration?: Duration;
  startOffset?: StartOffset;
  videoCodec?: VideoCodec;
  resize?: Resize;
};

type VideoV3Props = {
  src: string;
} & VideoTransformationProps;

interface VideoV2Props {
  cldVid: UrlGenCloudinaryVideo;
}

export type CloudinaryVideoProps = VideoV3Props | VideoV2Props;

export const CloudinaryVideo = forwardRef<HTMLVideoElement, CloudinaryVideoProps>((props, ref) => {
  if ('cldVid' in props) {
    const { cldVid, ...rest } = props;
    return <video src={cldVid.toURL()} {...rest} ref={ref} />;
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
    opacity: parseOpacity,
    duration: parseDuration,
    startOffset: parseStartOffset,
    videoCodec: parseVideoCodec
  } satisfies TransformationMap<VideoTransformationProps>;
  const { src, children, ...rest } = props
  const { baseCloudUrl, assetPath } = parseCloudinaryUrlToParts(props.src);
  const transformationString = parsePropsToTransformationString({
    transformationProps: rest,
    transformationMap
  });

  return <video src={`${baseCloudUrl}/${transformationString}/${assetPath}`} ref={ref} />;
});
