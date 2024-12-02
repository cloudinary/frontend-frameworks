import React from 'react';
import ReactDom from 'react-dom';
import { Cloudinary } from '@cloudinary/url-gen';
import { scale } from '@cloudinary/url-gen/actions/resize';
import { sepia, backgroundRemoval } from '@cloudinary/url-gen/actions/effect';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { CloudinaryImg } from './index';

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
        <CloudinaryImg cldImg={cloudinaryImageObject} />
      </div>
    </>
  );
};
// https://res.cloudinary.com/dzi6ifrzp/image/upload/Proboscis_Monkey_%28Nasalis_larvatus%29_male_%286707344031%29_jahicx.jpg
// https://asset.cloudinary.com/dzi6ifrzp/2de2f0efe1c963abdd612eb6a6714cf5

const NewComponentUsage = () => (
  <>
    <div>New Component Usage</div>
    <div>
      <CloudinaryImg
        src='https://res.cloudinary.com/demo/image/upload/front_face?_a=DATAg1AAZAA0'
        alt='front face'
        removeBackground
        format='auto'
        quality='auto'
        background={{ type: 'color', color: 'lightblue' }}
        height={333}
        effects={[{ type: 'sepia' }]}
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
