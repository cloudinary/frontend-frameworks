const bundlewatchConfig = {
  files: [
    {
      path: './dist/angular-library/bundles/cloudinary-angular.umd.js',
      maxSize: '30kb'
    },
    {
      path: './dist/angular-library/fesm5/cloudinary-angular.js',
      maxSize: '25kb'
    }
  ],
  defaultCompression: 'gzip',
};

module.exports = bundlewatchConfig;
