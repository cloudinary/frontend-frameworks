PACKAGE_VERSION=$(cat package.json | grep \\\"version\\\" | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]');

echo $PACKAGE_VERSION

# Bump all versions
npm version prerelease
npm version prerelease --prefix ./html
npm version prerelease --prefix ./react
npm version prerelease --prefix ./angular
npm version prerelease --prefix ./angular/projects/angular-library

# Build all libraries
npm run build --prefix ./html
npm run build --prefix ./react
npm run build --prefix ./angular

# Release all libraries
cd ./html/dist && npm run release && cd ../../
cd ./react/dist && npm run release && cd ../../
cd ./angular/dist/angular-library && npm run release && cd ../../../

# Add all new package.json's changes to git
git commit -am "New prerelease $PACKAGE_VERSION"
git tag "${PACKAGE_VERSION}" -am "Version ${PACKAGE_VERSION}"
