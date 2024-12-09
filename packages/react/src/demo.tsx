import React from 'react';
import ReactDom from 'react-dom';
import { Cloudinary } from '@cloudinary/url-gen';
import { scale } from '@cloudinary/url-gen/actions/resize';
import { videoCodec } from '@cloudinary/url-gen/actions/transcode';
import { h264 } from '@cloudinary/url-gen/qualifiers/videoCodec';
import { baseline } from '@cloudinary/url-gen/qualifiers/videoCodecProfile';
import { vcl31 } from '@cloudinary/url-gen/qualifiers/videoCodecLevel'
import { sepia, backgroundRemoval, blackwhite } from '@cloudinary/url-gen/actions/effect';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { CloudinaryImage, CloudinaryVideo } from './index';

const LegacyComponentUsage = () => {
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

  const cloudinaryVideoObject = cloudinary.video('dog.mp4')
    .effect(blackwhite())
    .transcode(
      videoCodec(
        h264()
          .profile(baseline())
          .level(vcl31())
      )
    );

  return (
    <>
      <div>Legacy Component Usage</div>
      <div style={{
        display: 'flex'
      }}
      >
        <CloudinaryImage cldImg={cloudinaryImageObject} />
        <CloudinaryVideo cldVid={cloudinaryVideoObject} autoPlay muted loop />
      </div>
    </>
  );
};

const NewComponentUsage = () => (
  <>
    <div>New Component Usage</div>
    <div style={{
      display: 'flex'
    }}
    >
      <CloudinaryImage
        src='https://res.cloudinary.com/demo/image/upload/front_face'
        alt='front face'
        removeBackground
        background={{ type: 'color', color: 'lightblue' }}
        effects={[{ type: 'sepia' }]}
        resize={{
          height: 333
        }}
        format='auto'
        quality='auto'
      />
      <CloudinaryVideo
        src='https://res.cloudinary.com/demo/video/upload/dog.mp4'
        removeBackground
        videoProps={{
          autoPlay: true,
          muted: true,
          loop: true
        }}
        duration='1%'
        resize={{
          height: 200,
          width: 200
        }}
        videoCodec={{
          use: 'h264',
          profile: 'baseline',
          level: 3.1
        }}
        effects={[
          { type: 'sepia' },
          { type: 'noise', level: 100 },
          { type: 'blur' }
        ]}
        roundCorners={100}
        rotate={50}
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
