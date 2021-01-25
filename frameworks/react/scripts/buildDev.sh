npm run build --prefix ../html &&
npm run pack --prefix ../html/dist &&
npm install ../html/dist/cloudinary-html-1.0.0-alpa.2.tgz &&
cp ../html/dist/cloudinary-html-1.0.0-alpa.2.tgz ./html/dist/ &&
microbundle-crl --no-compress --format modern,cjs &&
cp package.json ./dist
