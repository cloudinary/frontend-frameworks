import { AspectRatio } from './aspectRatio';
import { Gravity } from './gravity';
import { RequireAtLeastOneProperty, RequireAtLeastTwoProperties } from './helpers';
import { Background } from './background';

export type WidthOption = 'auto' | 'initial-width' | number;

export type HeightOption = 'auto' | 'initial-height' | number;

interface SizeOptions {
  width: WidthOption;
  height: HeightOption;
}

// FIXME look through `mode` values and align to pattern
type AutoResize = {
  mode: 'auto';
  gravity: Gravity;
} & RequireAtLeastTwoProperties<SizeOptions & { aspectRatio: AspectRatio }>;

type AutoPaddingResize = {
  mode: 'autoPadding';
  gravity: Gravity;
  background?: Background;
} & RequireAtLeastTwoProperties<SizeOptions & { aspectRatio: AspectRatio }>;

export type ScaleResize = {
  mode: 'scale';
  gravity?: 'liquid';
  ignoreAspectRatio?: boolean;
} & RequireAtLeastOneProperty<SizeOptions & { aspectRatio: AspectRatio }>;

type LimitedResize = {
  mode: 'limited';
} & RequireAtLeastTwoProperties<SizeOptions & { aspectRatio: AspectRatio }>;

type PaddingResize = {
  mode: 'padding' | 'limitedPadding' | 'minimumPadding';
  gravity?: Gravity;
  background?: Background;
} & RequireAtLeastTwoProperties<SizeOptions & { aspectRatio: AspectRatio }>;

type FitResize = {
  mode: 'fit' | 'minimumFit';
} & RequireAtLeastTwoProperties<SizeOptions & { aspectRatio: AspectRatio }>;

type FillResize = {
  mode: 'fill' | 'limitedFill';
  gravity?: Gravity;
} & RequireAtLeastTwoProperties<SizeOptions & { aspectRatio: AspectRatio }>;

type FillPaddingResize = {
  mode: 'fillPadding';
  gravity: 'auto';
  background?: Background;
} & RequireAtLeastTwoProperties<SizeOptions & { aspectRatio: AspectRatio }>;

type CropResize = {
  mode: 'crop';
  gravity?: Gravity;
  x?: number;
  y?: number;
} & RequireAtLeastTwoProperties<SizeOptions & { aspectRatio: AspectRatio }>;

type ThumbResize = {
  mode: 'thumbnail';
  gravity: Gravity;
  zoom?: number;
} & RequireAtLeastTwoProperties<SizeOptions & { aspectRatio: AspectRatio }>;

type ImaggaCropResize = {
  mode: 'imaggaCrop';
  aspectRatio?: AspectRatio;
} & RequireAtLeastOneProperty<SizeOptions>;

type ImaggaScaleResize = {
  mode: 'imaggaScale';
} & RequireAtLeastTwoProperties<SizeOptions & { aspectRatio: AspectRatio }>;

// FIXME improve error reporting (misinferring in tsc)
export type Resize =
  | (RequireAtLeastOneProperty<SizeOptions> & { mode?: never })
  | ImaggaScaleResize
  | ImaggaCropResize
  | CropResize
  | AutoResize
  | ThumbResize
  | ScaleResize
  | FitResize
  | LimitedResize
  | PaddingResize
  | FillResize
  | AutoPaddingResize
  | FillPaddingResize;
