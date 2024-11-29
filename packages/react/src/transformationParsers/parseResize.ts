import { HeightOption, Resize, WidthOption } from '../transformationTypes/resize';
import { AspectRatio } from '../transformationTypes/aspectRatio';
import { Gravity } from '../transformationTypes/gravity';
import { Background } from '../transformationTypes/background';

export interface CreateParseResizeParams {
  parseHeight: (height: HeightOption) => string;
  parseWidth: (width: WidthOption) => string;
  parseGravity: (gravity: Gravity) => string;
  parseAspectRatio: (aspectRatio: AspectRatio) => string;
  parseBackground: (background: Background) => string;
  parseIgnoreAspectRatio: (ignoreAspectRatio: boolean) => string;
}

export const createParseResize =
  ({ parseHeight, parseWidth, parseGravity, parseAspectRatio, parseBackground, parseIgnoreAspectRatio }: CreateParseResizeParams) =>
    (resize: Resize) => {
      const parseWhenDefined = <Value, MaybeValue extends Value | undefined>
        (value: MaybeValue, parser: (value: Value) => string) => {
        if (typeof value === 'undefined') {
          return '';
        }

        return `,${parser(value)}`;
      };

      switch (resize.mode) {
        case 'auto':
          return `c_auto${
            parseWhenDefined(resize.gravity, parseGravity)}${
            parseWhenDefined(resize.aspectRatio, parseAspectRatio)}${
            parseWhenDefined(resize.width, parseWidth)}${
            parseWhenDefined(resize.height, parseHeight)
          }`;
        case 'autoPadding':
          return `c_auto_pad${
            parseWhenDefined(resize.gravity, parseGravity)}${
            parseWhenDefined(resize.aspectRatio, parseAspectRatio)}${
            parseWhenDefined(resize.width, parseWidth)}${
            parseWhenDefined(resize.height, parseHeight)}${
            parseWhenDefined(resize.background, parseBackground)
          }`;
        case 'scale':
          return `c_scale${
            parseWhenDefined(resize.ignoreAspectRatio, parseIgnoreAspectRatio)}${
            parseWhenDefined(resize.aspectRatio, parseAspectRatio)}${
            parseWhenDefined(resize.width, parseWidth)}${
            parseWhenDefined(resize.height, parseHeight)
          }`;
        case 'liquidScale':
          return `c_scale,g_liquid${
            parseWhenDefined(resize.ignoreAspectRatio, parseIgnoreAspectRatio)}${
            parseWhenDefined(resize.aspectRatio, parseAspectRatio)}${
            parseWhenDefined(resize.width, parseWidth)}${
            parseWhenDefined(resize.height, parseHeight)
          }`;
        case 'limited':
          return `c_limit${
            parseWhenDefined(resize.aspectRatio, parseAspectRatio)}${
            parseWhenDefined(resize.width, parseWidth)}${
            parseWhenDefined(resize.height, parseHeight)
          }`;
        case 'padding':
        case 'limitedPadding':
        case 'minimumPadding':
          return `${
            resize.mode === 'padding' ? 'c_pad' : resize.mode === 'limitedPadding' ? 'c_lpad' : 'c_mpad'}${
            parseWhenDefined(resize.gravity, parseGravity)}${
            parseWhenDefined(resize.aspectRatio, parseAspectRatio)}${
            parseWhenDefined(resize.background, parseBackground)}${
            parseWhenDefined(resize.width, parseWidth)}${
            parseWhenDefined(resize.height, parseHeight)
          }`;
        case 'fit':
        case 'minimumFit':
          return `${
            resize.mode === 'fit' ? 'c_fit' : 'c_mfit'}${
            parseWhenDefined(resize.aspectRatio, parseAspectRatio)}${
            parseWhenDefined(resize.width, parseWidth)}${
            parseWhenDefined(resize.height, parseHeight)
          }`;
        case 'fill':
          return `c_fill${
            parseWhenDefined(resize.gravity, parseGravity)}${
            parseWhenDefined(resize.aspectRatio, parseAspectRatio)}${
            parseWhenDefined(resize.width, parseWidth)}${
            parseWhenDefined(resize.height, parseHeight)
          }`;
        case 'limitedFill':
          return `c_lfill${
            parseWhenDefined(resize.gravity, parseGravity)}${
            parseWhenDefined(resize.aspectRatio, parseAspectRatio)}${
            parseWhenDefined(resize.width, parseWidth)}${
            parseWhenDefined(resize.height, parseHeight)
          }`;
        case 'fillPadding':
          return `c_fill_pad${
            parseWhenDefined(resize.gravity, parseGravity)}${
            parseWhenDefined(resize.aspectRatio, parseAspectRatio)}${
            parseWhenDefined(resize.width, parseWidth)}${
            parseWhenDefined(resize.height, parseHeight)
          }`;
        case 'crop':
          return `c_crop${
            parseWhenDefined(resize.gravity, parseGravity)}${
            parseWhenDefined(resize.aspectRatio, parseAspectRatio)}${
            parseWhenDefined(resize.width, parseWidth)}${
            parseWhenDefined(resize.height, parseHeight)
          }`;
        case 'thumb':
          return `c_thumb${
            parseWhenDefined(resize.gravity, parseGravity)}${
            parseWhenDefined(resize.aspectRatio, parseAspectRatio)}${
            parseWhenDefined(resize.width, parseWidth)}${
            parseWhenDefined(resize.height, parseHeight)
          }`;
        case 'imaggaCrop':
          return `c_imagga_crop${
            parseWhenDefined(resize.aspectRatio, parseAspectRatio)}${
            parseWhenDefined(resize.width, parseWidth)}${
            parseWhenDefined(resize.height, parseHeight)
          }`;
        case 'imaggaScale':
          return `c_imagga_scale${
            parseWhenDefined(resize.width, parseWidth)}${
            parseWhenDefined(resize.height, parseHeight)
          }`;
      }
    };
