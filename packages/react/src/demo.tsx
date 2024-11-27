import React from 'react';
import ReactDom from 'react-dom';
import { Cloudinary } from '@cloudinary/url-gen';
import { CloudinaryImg } from './index';
import { ResizeSimpleAction } from '@cloudinary/url-gen/actions/resize/ResizeSimpleAction';

const LegacyComponentUsage = () => {
  const cloudinary = new Cloudinary();
  const cloudinaryImageObject = cloudinary.image('sample')
    .resize(new ResizeSimpleAction('pixelated', 200));

  return (
    <>
      <div>Legacy Component Usage</div>
      <div>
        <CloudinaryImg cldImg={cloudinaryImageObject} />
      </div>
    </>
  );
};

const NewComponentUsage = () =>
  (
    <>
      <div>New Component Usage</div>
      <div>
        <CloudinaryImg
          src='https://res.cloudinary.com/dzi6ifrzp/image/upload/Proboscis_Monkey_%28Nasalis_larvatus%29_male_%286707344031%29_jahicx.jpg'
          alt='proboscis monkey'
          height={200}
        />
      </div>
    </>
  );

const Demo = () => {
  return <>
    <LegacyComponentUsage />
  </>;
};

document.addEventListener('DOMContentLoaded', () => {
  ReactDom.render(<Demo />, document.getElementById('root'));
});

