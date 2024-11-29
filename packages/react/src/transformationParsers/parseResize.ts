import { HeightOption, Resize, WidthOption } from '../transformationTypes/resize';
import { AspectRatio } from '../transformationTypes/aspectRatio';
import { Gravity } from '../transformationTypes/gravity';

interface CreateParseResizeParams {
  parseHeight: (height: HeightOption) => string;
  parseWidth: (width: WidthOption) => string;
  parseGravity: (gravity: Gravity) => string;
  parseAspectRatio: (aspectRatio: AspectRatio) => string;
}

// FIXME fill in missing resize parsing
export const createParseResize =
  ({ parseHeight, parseWidth, parseGravity, parseAspectRatio }: CreateParseResizeParams) =>
    (resize: Resize) => {
      const parseWhenDefined = <T>(value: T | undefined, parser: (value: T) => string) => {
        if (typeof value === 'undefined') {
          return '';
        }

        return `,${parser(value)}`;
      };

      switch (resize.mode) {
        case 'auto':
          return `c_auto${parseWhenDefined(resize.gravity, parseGravity)}${parseWhenDefined(
          resize.aspectRatio,
          parseAspectRatio
        )}${parseWhenDefined(resize.width, parseWidth)}${parseWhenDefined(resize.height, parseHeight)}`;
        case 'autoPadding':
          return `c_auto${parseWhenDefined(resize.gravity, parseGravity)}${parseWhenDefined(
          resize.aspectRatio,
          parseAspectRatio
        )}${parseWhenDefined(resize.width, parseWidth)}${parseWhenDefined(resize.height, parseHeight)}`;
        case 'scale':
        case 'liquidScale':
          return `c_auto${parseWhenDefined(resize.gravity, parseGravity)}${parseWhenDefined(
          resize.aspectRatio,
          parseAspectRatio
        )}${parseWhenDefined(resize.width, parseWidth)}${parseWhenDefined(resize.height, parseHeight)}`;
        case 'limited':
          return `c_auto${parseWhenDefined(resize.gravity, parseGravity)}${parseWhenDefined(
          resize.aspectRatio,
          parseAspectRatio
        )}${parseWhenDefined(resize.width, parseWidth)}${parseWhenDefined(resize.height, parseHeight)}`;
        case 'padding':
        case 'limitedPadding':
        case 'minimumPadding':
          return `c_auto${parseWhenDefined(resize.gravity, parseGravity)}${parseWhenDefined(
          resize.aspectRatio,
          parseAspectRatio
        )}${parseWhenDefined(resize.width, parseWidth)}${parseWhenDefined(resize.height, parseHeight)}`;
        case 'fit':
        case 'minimumFit':
          return `c_auto${parseWhenDefined(resize.gravity, parseGravity)}${parseWhenDefined(
          resize.aspectRatio,
          parseAspectRatio
        )}${parseWhenDefined(resize.width, parseWidth)}${parseWhenDefined(resize.height, parseHeight)}`;
        case 'fill':
        case 'limitedFill':
          return `c_auto${parseWhenDefined(resize.gravity, parseGravity)}${parseWhenDefined(
          resize.aspectRatio,
          parseAspectRatio
        )}${parseWhenDefined(resize.width, parseWidth)}${parseWhenDefined(resize.height, parseHeight)}`;
        case 'fillPadding':
          return `c_auto${parseWhenDefined(resize.gravity, parseGravity)}${parseWhenDefined(
          resize.aspectRatio,
          parseAspectRatio
        )}${parseWhenDefined(resize.width, parseWidth)}${parseWhenDefined(resize.height, parseHeight)}`;
        case 'crop':
          return `c_auto${parseWhenDefined(resize.gravity, parseGravity)}${parseWhenDefined(
          resize.aspectRatio,
          parseAspectRatio
        )}${parseWhenDefined(resize.width, parseWidth)}${parseWhenDefined(resize.height, parseHeight)}`;
        case 'thumb':
          return `c_auto${parseWhenDefined(resize.gravity, parseGravity)}${parseWhenDefined(
          resize.aspectRatio,
          parseAspectRatio
        )}${parseWhenDefined(resize.width, parseWidth)}${parseWhenDefined(resize.height, parseHeight)}`;
        case 'imagga_crop':
          return `c_auto${parseWhenDefined(resize.gravity, parseGravity)}${parseWhenDefined(
          resize.aspectRatio,
          parseAspectRatio
        )}${parseWhenDefined(resize.width, parseWidth)}${parseWhenDefined(resize.height, parseHeight)}`;
        case 'imagga_scale':
          return `c_auto${parseWhenDefined(resize.gravity, parseGravity)}${parseWhenDefined(
          resize.aspectRatio,
          parseAspectRatio
        )}${parseWhenDefined(resize.width, parseWidth)}${parseWhenDefined(resize.height, parseHeight)}`;
      }
    };
