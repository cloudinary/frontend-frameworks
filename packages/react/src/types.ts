export type CloudinaryImageQuality =
  | 'auto'
  | 'auto:good'
  | 'auto:eco'
  | 'auto:low'
  | 'auto:best'
  | 'jpegmini'
  | 'jpegmini:0'
  | 'jpegmini:1'
  | 'jpegmini:2'
  | 'low'
  | 'eco'
  | 'medium'
  | 'good'
  | 'high'
  | 'best';

export type CloudinaryImageFormat =
  | 'auto'
  | 'jpg'
  | 'png'
  | 'gif'
  | 'webp'
  | 'bmp'
  | 'ico'
  | 'pdf'
  | 'tiff'
  | 'eps'
  | 'jpc'
  | 'jp2'
  | 'psd'
  | 'svg'
  | 'avif'
  | 'heic'
  | 'heif';

export type CloudinaryVideoFormat =
  | 'webm'
  | 'mp4'
  | 'mkv'
  | 'flv'
  | 'mov'
  | '3gp'
  | 'avi'
  | 'wmv';

export type CloudinaryRemoveBackgroundOption = boolean | 'fineEdges';
