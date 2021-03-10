rm -rf node_modules
rm -rf frameworks/react/node_modules
rm -rf frameworks/html/node_modules
rm -rf frameworks/angular/node_modules
rm -rf frameworks/react/test-app/node_modules

npm install --prefix frameworks/html #install html
npm run build --prefix frameworks/html #install html
npm install . #install root, which also links html/dist

npm install --force --prefix frameworks/react
npm install --force --prefix frameworks/angular
npm install --force --prefix frameworks/svelte
npm install --force --prefix e2e-tests

rm -rf frameworks/react/node_modules/@cloudinary/html
rm -rf frameworks/svelte/node_modules/@cloudinary/html
rm -rf frameworks/react/test-app/node_modules/@cloudinary/html

npm run build --prefix frameworks/react
npm run build --prefix frameworks/angular
npm run build --prefix frameworks/svelte
