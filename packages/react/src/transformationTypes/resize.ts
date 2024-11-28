import { AspectRatio } from './aspectRatio';
import { Gravity } from './gravity';
import { RequireAtLeastOneProperty, RequireAtLeastTwoProperties } from './helpers';
import { Background } from './background';

export type WidthOption = 'auto' | 'initial-width' | number;

export type HeightOption = 'auto' | 'initial-height' | number;

interface SizeOptions {
  width: number;
  height: number;
}

type AutoResize = {
  mode: 'auto';
  gravity: Gravity;
} & RequireAtLeastTwoProperties<SizeOptions & { aspectRatio: AspectRatio }>;

type AutoPaddingResize = {
  mode: 'autoPadding';
  gravity: Gravity;
  background?: Background;
} & RequireAtLeastTwoProperties<SizeOptions & { aspectRatio: AspectRatio }>;

type ScaleResize = {
  mode: 'scale' | 'scale-liquid';
  ignoreAspectRatio?: boolean;
} & RequireAtLeastOneProperty<SizeOptions & { aspectRatio: AspectRatio }>;

type FitResize = {
  mode: 'fit';
} & RequireAtLeastOneProperty<SizeOptions & { aspectRatio: AspectRatio }>;

type LimitedResize = {
  mode: 'limited';
} & RequireAtLeastOneProperty<SizeOptions & { aspectRatio: AspectRatio }>;

type PaddingResize = {
  mode: 'padding';
  gravity?: Gravity;
  aspectRatio?: AspectRatio;
  background?: Background;
} & RequireAtLeastOneProperty<SizeOptions & { aspectRatio: AspectRatio }>;

type LimitedPaddingResize = {
  mode: 'limitedPadding';
  gravity?: Gravity;
  aspectRatio?: AspectRatio;
  background?: Background;
} & RequireAtLeastOneProperty<SizeOptions & { aspectRatio: AspectRatio }>;

type MinimumPaddingResize = {
  mode: 'minimumPadding';
  gravity?: Gravity;
  background?: Background;
} & RequireAtLeastOneProperty<SizeOptions & { aspectRatio: AspectRatio }>;

type MinimumFitResize = {
  mode: 'minimumFit';
} & RequireAtLeastOneProperty<SizeOptions & { aspectRatio: AspectRatio }>;

type FillResize = {
  mode: 'fill';
  gravity?: Gravity;
} & RequireAtLeastOneProperty<SizeOptions & { aspectRatio: AspectRatio }>;

type FillPaddingResize = {
  mode: 'fillPadding';
  gravity: `auto${string}`;
  background?: Background;
} & RequireAtLeastOneProperty<SizeOptions & { aspectRatio: AspectRatio }>;

type LimitedFillResize = {
  mode: 'limitedFill';
  gravity?: Gravity;
} & RequireAtLeastOneProperty<SizeOptions & { aspectRatio: AspectRatio }>;

type CropResize = {
  mode: 'crop';
  gravity?: Gravity;
  x?: number;
  y?: number;
} & RequireAtLeastOneProperty<SizeOptions & { aspectRatio: AspectRatio }>;

type ThumbResize = {
  mode: 'thumb';
  gravity: Gravity;
  zoom?: number;
} & RequireAtLeastTwoProperties<SizeOptions & { aspectRatio: AspectRatio }>;

type ImaggaCropResize = {
  mode: 'imagga_crop';
  aspectRatio?: AspectRatio;
} & RequireAtLeastOneProperty<SizeOptions>;

type ImaggaScaleResize = {
  mode: 'imagga_scale';
} & RequireAtLeastOneProperty<SizeOptions & AspectRatio>;

export type Resize =
  | ImaggaScaleResize
  | ImaggaCropResize
  | CropResize
  | AutoResize
  | ThumbResize
  | ScaleResize
  | FitResize
  | LimitedResize
  | LimitedPaddingResize
  | PaddingResize
  | MinimumPaddingResize
  | FillResize
  | MinimumFitResize
  | LimitedFillResize
  | AutoPaddingResize
  | FillPaddingResize;
