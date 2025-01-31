import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CloudinaryImage } from './CloudinaryImage';
import { Cloudinary } from '@cloudinary/url-gen';
import { backgroundRemoval, sepia } from '@cloudinary/url-gen/actions/effect';
import { scale } from '@cloudinary/url-gen/actions/resize';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';

const meta: Meta<typeof CloudinaryImage> = {
  component: CloudinaryImage,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof CloudinaryImage>;

export const VersionV3: Story = {
  render: () => {
    return (
      <CloudinaryImage
        src='https://res.cloudinary.com/demo/image/upload/front_face'
        alt='front face'
        removeBackground
        effects={[{ type: 'sepia' }]}
        resize={{ height: 333 }}
        format='auto'
        quality='auto'
        opacity={100}
        background={{ type: 'color', color: 'white' }}
        roundCorners={0}
        rotate={0}
      />
    );
  }
};

export const VersionV2: Story = {
  render: () => {
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

    return <CloudinaryImage cldImg={cloudinaryImageObject} alt='' />
  }
}
