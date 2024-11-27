import React, { forwardRef } from 'react';
import { type CloudinaryImage as UrlGenCloudinaryImage } from '@cloudinary/url-gen/assets/CloudinaryImage';
import { ImageFormat, Quality, CloudinaryRemoveBackgroundOption, ResizeOption } from './types';

interface CloudinaryImgLegacyProps {
  cldImg: UrlGenCloudinaryImage;
}

interface CloudinaryImgNewProps {
  src: string;
  alt: string;
  quality?: Quality;
  format?: ImageFormat;
  removeBackground?: CloudinaryRemoveBackgroundOption;
  resize?: ResizeOption;
}

// export type CldImageProps = ;

export const CloudinaryImg = forwardRef<HTMLImageElement, CloudinaryImgNewProps | CloudinaryImgLegacyProps>((props, ref) => {
  if ('cldImg' in props) {
    const { cldImg, ...rest } = props;
    return <img src={cldImg.toURL()} {...rest} ref={ref} />;
  }

  return <img {...props} ref={ref} />;
});

