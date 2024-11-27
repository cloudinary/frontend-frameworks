import React, { forwardRef } from 'react';
import { type CloudinaryImage as UrlGenCloudinaryImage } from '@cloudinary/url-gen/assets/CloudinaryImage';
import {
  ImageFormat,
  Quality,
  CloudinaryRemoveBackgroundOption,
  ResizeOption,
  WidthOption,
  HeightOption
} from './types';

interface CloudinaryImgLegacyProps {
  cldImg: UrlGenCloudinaryImage;
}

type ResizeProps = {
  height?: HeightOption;
  width?: WidthOption;
} | {
  resize?: ResizeOption;
}

type CloudinaryImgNewProps = ResizeProps & {
  src: string;
  alt: string;
  quality?: Quality;
  format?: ImageFormat;
  removeBackground?: CloudinaryRemoveBackgroundOption;
}

export type CldImageProps = CloudinaryImgNewProps | CloudinaryImgLegacyProps;

export const CloudinaryImg = forwardRef<HTMLImageElement, CldImageProps>((props, ref) => {
  if ('cldImg' in props) {
    const { cldImg, ...rest } = props;
    return <img src={cldImg.toURL()} {...rest} ref={ref} />;
  }

  return <img {...props} ref={ref} />;
});

