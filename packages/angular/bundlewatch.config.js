const bundlewatchConfig = {
  files: [
    {
      path: './dist/cloudinary-library/bundles/cloudinary-angular.umd.js',
      maxSize: '30kb'
    },
    {
      path: './dist/cloudinary-library/fesm5/cloudinary-angular.js',
      maxSize: '25kb'
    }
  ],
  defaultCompression: 'gzip',
};

module.exports = bundlewatchConfig;
