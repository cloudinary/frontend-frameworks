import React, { forwardRef } from 'react';
import {type CloudinaryImage as UrlGenCloudinaryImage} from '@cloudinary/url-gen/assets/CloudinaryImage';
import {CloudinaryImageFormat, CloudinaryImageQuality, CloudinaryRemoveBackgroundOption} from "./types";

interface CloudinaryImgLegacyProps {
  cldImg: UrlGenCloudinaryImage;
}

interface BaseResizeOptions {
  width: number;
  height: number;
}

interface ScaleResizeOptions extends BaseResizeOptions {
  type: 'scale';
  aspectRatio?: string;
}

interface FitResizeOptions extends BaseResizeOptions {
  type: 'fit';
  aspectRatio?: string;
}

interface LimitResizeOptions extends BaseResizeOptions {
  type: 'limit';
  aspectRatio?: string;
}

interface MfitResizeOptions extends BaseResizeOptions {
  type: 'mfit';
  aspectRatio?: string;
}

interface FillResizeOptions extends BaseResizeOptions {
  type: 'fill';
  gravity?: string;
  aspectRatio?: string;
}

interface LfillResizeOptions extends BaseResizeOptions {
  type: 'lfill';
  gravity?: string;
  aspectRatio?: string;
}

interface PadResizeOptions extends BaseResizeOptions {
  type: 'pad';
  gravity?: string;
  aspectRatio?: string;
  background?: string;
}

interface LpadResizeOptions extends BaseResizeOptions {
  type: 'lpad';
  gravity?: string;
  aspectRatio?: string;
  background?: string;
}

interface MpadResizeOptions extends BaseResizeOptions {
  type: 'mpad';
  gravity?: string;
  aspectRatio?: string;
  background?: string;
}

interface CropResizeOptions extends BaseResizeOptions {
  type: 'crop';
  gravity?: string;
  x?: number;
  y?: number;
  zoom?: number;
  aspectRatio?: string;
}

interface ThumbResizeOptions extends BaseResizeOptions {
  type: 'thumb';
  gravity?: string;
  aspectRatio?: string;
}

interface ImaggaCropResizeOptions extends BaseResizeOptions {
  type: 'imagga_crop';
  aspectRatio?: string;
}

interface ImaggaScaleResizeOptions extends BaseResizeOptions {
  type: 'imagga_scale';
  aspectRatio?: string;
}

type ResizeOptions =
  | ScaleResizeOptions
  | FitResizeOptions
  | LimitResizeOptions
  | MfitResizeOptions
  | FillResizeOptions
  | LfillResizeOptions
  | PadResizeOptions
  | LpadResizeOptions
  | MpadResizeOptions
  | CropResizeOptions
  | ThumbResizeOptions
  | ImaggaCropResizeOptions
  | ImaggaScaleResizeOptions;

interface CloudinaryImgNewProps {
  src: string;
  alt: string;
  quality?: CloudinaryImageQuality;
  format?: CloudinaryImageFormat;
  removeBackground?: CloudinaryRemoveBackgroundOption;
  resize?: ResizeOptions;
}
export type CldImageProps = CloudinaryImgNewProps | CloudinaryImgLegacyProps;

const isCloudinaryImgLegacyProps = (props: CldImageProps): props is CloudinaryImgLegacyProps => 'cldImg' in props;

export const CloudinaryImg = forwardRef((props: CldImageProps, ref) => {
  if (isCloudinaryImgLegacyProps(props)) {
    const { cldImg, ...rest } = props;
    return <img src={cldImg.toURL()} {...rest} ref />
  }

  return <img {...props} ref={ref} />
})

