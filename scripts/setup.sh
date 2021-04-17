echo "***** Deleteing all node_modules modules *****"
rm -rf node_modules
rm -rf frameworks/react/node_modules
rm -rf frameworks/html/node_modules
rm -rf frameworks/angular/node_modules
rm -rf frameworks/vue/vue3/node_modules
rm -rf frameworks/svelte/node_modules
rm -rf e2e-tests/node_modules

echo "***** Installing HTML *****"
npm install --prefix frameworks/html #install html
echo "***** Building HTML *****"
npm run build --prefix frameworks/html #install html
echo "***** Install root and link HTML *****"
npm install . #install root, which also links html/dist

echo "***** Install React *****"
npm install --force --prefix frameworks/react
echo "***** Install Angular *****"
npm install --force --prefix frameworks/angular
echo "***** Install Vue 3 *****"
npm install --force --prefix frameworks/vue/vue3
echo "***** Install Svelte *****"
npm install --force --prefix frameworks/svelte
echo "***** Install e2e tests *****"
npm install --force --prefix e2e-tests

echo "***** Delete HTML from React, Vue and Svelte *****" # why?
rm -rf frameworks/react/node_modules/@cloudinary/html
rm -rf frameworks/vue/vue3/node_modules/@cloudinary/html
rm -rf frameworks/svelte/node_modules/@cloudinary/html

echo "***** Build React *****"
npm run build --prefix frameworks/react
echo "***** Build Angular *****"
npm run build --prefix frameworks/angular
echo "***** Build Vue 3 *****"
npm run build --prefix frameworks/vue/vue3
echo "***** Build Svelte *****"
npm run build --prefix frameworks/svelte
