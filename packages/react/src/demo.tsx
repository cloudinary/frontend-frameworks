import React from 'react';
import ReactDom from 'react-dom';
import { Cloudinary } from '@cloudinary/url-gen';
import { scale } from '@cloudinary/url-gen/actions/resize';
import { sepia, backgroundRemoval } from '@cloudinary/url-gen/actions/effect';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { CloudinaryImage } from './index';

const LegacyComponentUsage = () => {
  const cloudinary = new Cloudinary({
    cloud: {
      cloudName: 'demo'
    }
  });
  const cloudinaryImageObject = cloudinary
    .image('front_face')
    .effect(backgroundRemoval())
    .backgroundColor('lightblue')
    .effect(sepia())
    .resize(scale().height(333))
    .delivery(format('auto'))
    .delivery(quality('auto'));

  return (
    <>
      <div>Legacy Component Usage</div>
      <div>
        <CloudinaryImage  cldImg={cloudinaryImageObject}    />
      </div>
    </>
  );
};

const NewComponentUsage = () => (
  <>
    <div>New Component Usage</div>
    <div>
      <CloudinaryImage
        src='https://res.cloudinary.com/demo/image/upload/front_face?_a=DATAg1AAZAA0'
        alt='front face'
        background={{ type: 'color', color: 'lightblue' }}
        effects={[{ type: 'sepia' }]}
        resize={{
          height: 333
        }}
        format='auto'
        quality='auto'
      />
    </div>
  </>
);

const Demo = () => {
  return (
    <>
      <LegacyComponentUsage />
      <NewComponentUsage />
    </>
  );
};

document.addEventListener('DOMContentLoaded', () => {
  ReactDom.render(<Demo />, document.getElementById('root'));
});
