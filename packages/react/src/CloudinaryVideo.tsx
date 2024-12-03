import React, { forwardRef } from 'react';
import { type CloudinaryVideo as UrlGenCloudinaryVideo } from '@cloudinary/url-gen/assets/CloudinaryVideo';
import { VideoTransformationNameToParser, VideoTransformationProps } from './types';
import { parseCloudinaryUrlToParts } from './parseCloudinaryUrlToParts';
import { parseFormat } from './transformationParsers/parseFormat';
import { parseQuality } from './transformationParsers/parseQuality';
import { parseWidth } from './transformationParsers/parseWidth';
import { parseHeight } from './transformationParsers/parseHeight';
import { parseVideoPropsToTransformationString } from './parseVideoPropsToTransformationString';

type ImageV3Props = {
  src: string;
  alt: string;
} & VideoTransformationProps;

interface ImageV2Props {
  cldVid: UrlGenCloudinaryVideo;
}

export type CldImageProps = ImageV3Props | ImageV2Props;

export const CloudinaryImg = forwardRef<HTMLImageElement, CldImageProps>((props, ref) => {
  if ('cldVid' in props) {
    const { cldVid, ...rest } = props;
    return <img src={cldVid.toURL()} {...rest} ref={ref} />;
  }

  const transformationPropsKeyToParser = {
    format: parseFormat,
    quality: parseQuality,
    // background: parseBackground,
    width: parseWidth,
    height: parseHeight
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
    // rotate: parseRotate,
    // roundCorners: parseRoundCorners,
    // opacity: parseOpacity
  } satisfies VideoTransformationNameToParser;
  const { baseCloudUrl, assetPath } = parseCloudinaryUrlToParts(props.src);
  const transformationString = parseVideoPropsToTransformationString(transformationPropsKeyToParser, props);

  return <img src={`${baseCloudUrl}/${transformationString}/${assetPath}`} ref={ref} />;
});
