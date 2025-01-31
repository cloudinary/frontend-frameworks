type Codecs = 'h264' | 'h265' | 'av1' | 'prores' | 'theora' | 'vp8' | 'vp9' | 'none';
type H264Profile ='baseline' | 'main' | 'high' | 'high444' | 'auto';
type H264Level = 3.0 | 3.1 | 4.0 | 4.1 | 4.2 | 5.0 | 5.1 | 5.2 | 'auto';

export type VideoCodec = Codecs | {
  use: 'h264';
  profile?: H264Profile;
  level?: H264Level;
  /**
   * @default true
   */
  includeBFrames?: true;
} | {
  use: 'h264';
  includeBFrames: false;
  profile: H264Profile;
  level: H264Level;
};
