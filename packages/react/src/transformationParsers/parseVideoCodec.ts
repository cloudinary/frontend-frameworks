import { VideoCodec } from '../transformationTypes/videoCodec';

export const parseVideoCodec = (videoCodec: VideoCodec): `vc_${string}` => {
  if (typeof videoCodec === 'string') {
    return `vc_${videoCodec}`;
  }

  if (videoCodec.includeBFrames === false) {
    return `vc_${videoCodec.use}:${videoCodec.profile}:${videoCodec.level}:bframes_no:`
  }

  return `vc_${videoCodec.use}${
    Object.is(videoCodec.profile, undefined) ? '' : `:${videoCodec.profile}`
  }${
    Object.is(videoCodec.level, undefined) ? '' : `:${videoCodec.level}`
  }`;
}
