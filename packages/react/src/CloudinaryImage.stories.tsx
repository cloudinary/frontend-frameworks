import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentType } from 'react';
import { CloudinaryImage, CloudinaryImageProps } from './CloudinaryImage';
import { Cloudinary } from '@cloudinary/url-gen';
import { backgroundRemoval, sepia } from '@cloudinary/url-gen/actions/effect';
import { scale } from '@cloudinary/url-gen/actions/resize';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';

// FIXME `Meta` cant handle discriminated union or `forwardRef`
const meta: Meta<ComponentType<CloudinaryImageProps>>= {
  component: CloudinaryImage,
};

export default meta;
// FIXME `StoryObj` cant handle discriminated union
type V3Story = StoryObj<ComponentType<Extract<CloudinaryImageProps, {src: string}>>>;

export const VersionV3: V3Story = {
  args: {
    src: 'https://res.cloudinary.com/demo/image/upload/front_face',
    alt: 'front face',
    removeBackground: true,
    effects: [{ type: 'sepia' }],
    resize: { height: 333 },
    format: 'auto',
    quality: 'auto'
  }
};

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: 'demo'
  }
});
const cloudinaryImageObject = cloudinary
  .image('front_face')
  .effect(backgroundRemoval())
  .effect(sepia())
  .resize(scale().height(333))
  .delivery(format('auto'))
  .delivery(quality('auto'));

export const VersionV2 = {
  args: {
    cldImg: cloudinaryImageObject,
  }
}
