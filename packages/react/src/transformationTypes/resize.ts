import { AspectRatio } from './aspectRatio';
import { Gravity } from './gravity';
import { RequireAtLeastOneProperty } from './helpers';

export type WidthOption = 'auto' | 'initial-width' | number;

export type HeightOption = 'auto' | 'initial-height' | number;

interface SizeOptions {
  width: number;
  height: number;
}

interface ScaleResizeOptions {
  type: 'scale';
  aspectRatio?: AspectRatio;
}

interface FitResizeOptions {
  type: 'fit';
  aspectRatio?: AspectRatio;
}

interface LimitResizeOptions {
  type: 'limit';
  aspectRatio?: AspectRatio;
}

interface MfitResizeOptions {
  type: 'mfit';
  aspectRatio?: AspectRatio;
}

interface FillResizeOptions {
  type: 'fill';
  gravity?: Gravity;
  aspectRatio?: AspectRatio;
}

interface LfillResizeOptions {
  type: 'lfill';
  gravity?: Gravity;
  aspectRatio?: AspectRatio;
}

interface PadResizeOptions {
  type: 'pad';
  gravity?: Gravity;
  aspectRatio?: AspectRatio;
  background?: string;
}

interface LpadResizeOptions {
  type: 'lpad';
  gravity?: Gravity;
  aspectRatio?: AspectRatio;
  background?: string;
}

// FIXME TwoOfTheFollowing type required
interface MpadResizeOptions {
  type: 'mpad';
  gravity?: Gravity;
  background?: string;
}

interface CropResizeOptions {
  type: 'crop';
  gravity?: Gravity;
  x?: number;
  y?: number;
  zoom?: number;
  aspectRatio?: AspectRatio;
}

// FIXME TwoOfTheFollowing type required
interface ThumbResizeOptions {
  type: 'thumb';
  gravity: Gravity;
}

// DONE
type ImaggaCropResizeOptions = {
  type: 'imagga_crop';
  aspectRatio?: AspectRatio;
} & RequireAtLeastOneProperty<SizeOptions>;

// DONE
type ImaggaScaleResizeOptions = {
  type: 'imagga_scale';
} & RequireAtLeastOneProperty<SizeOptions & AspectRatio>;

// FIXME finish the ResizeOption type
type ResizeOption =
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

export type ResizeProps =
  | {
      height?: HeightOption;
      width?: WidthOption;
    }
  | {
      resize?: ResizeOption;
    };
