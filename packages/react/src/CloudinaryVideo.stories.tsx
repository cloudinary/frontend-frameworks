import type { Meta, StoryObj } from '@storybook/react';
import { CloudinaryVideo } from './CloudinaryVideo';
import { Cloudinary } from '@cloudinary/url-gen';
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { trim } from "@cloudinary/url-gen/actions/videoEdit";
import { blackwhite } from '@cloudinary/url-gen/actions/effect';
import { videoCodec } from '@cloudinary/url-gen/actions/transcode';
import { h264 } from '@cloudinary/url-gen/qualifiers/videoCodec';
import { baseline } from '@cloudinary/url-gen/qualifiers/videoCodecProfile';
import { vcl31 } from '@cloudinary/url-gen/qualifiers/videoCodecLevel';
import { scale } from '@cloudinary/url-gen/actions/resize';

const meta: Meta<typeof CloudinaryVideo>= {
  component: CloudinaryVideo,
};

export default meta;
type Story = StoryObj<typeof CloudinaryVideo>;

export const VersionV3: Story = {
  args: {
    src: 'https://res.cloudinary.com/demo/video/upload/dog.mp4',
    resize: { height: 333 },
    roundCorners: 20,
    duration: '1%',
    startOffset: 0,
    videoCodec: 'h264',
    videoProps: {
      loop: true,
      autoPlay: true,
      muted: true
    }
  }
};

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: 'demo'
  }
});
const cloudinaryVideoObject = cloudinary.video('dog.mp4')
  .effect(blackwhite())
  .resize(scale().height(333))
  .videoEdit(trim().duration("1p"))
  .roundCorners(byRadius(20))
  .transcode(
    videoCodec(
      h264()
        .profile(baseline())
        .level(vcl31())
    )
  );

export const VersionV2: Story = {
  args: {
    cldVid: cloudinaryVideoObject,
    loop: true,
    autoPlay: true,
    muted: true
  }
}
