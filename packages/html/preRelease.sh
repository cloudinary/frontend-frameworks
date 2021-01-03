
# Bump all versions
npm version prerelease --no-git-tag-version
npm version prerelease --no-git-tag-version --prefix ./html
npm version prerelease --no-git-tag-version --prefix ./react
npm version prerelease --no-git-tag-version --prefix ./angular
npm version prerelease --no-git-tag-version --prefix ./angular/projects/angular-library

# Build all libraries
npm run build --prefix ./html
npm run build --prefix ./react
npm run build --prefix ./angular

# Release all libraries
cd ./html/dist && npm publish --access public && cd ../../
cd ./react/dist && npm publish --access public && cd ../../
cd ./angular/dist/angular-library && npm publish --access public && cd ../../../


# Add all new package.json's changes to git
PACKAGE_VERSION=$(cat package.json | grep \\\"version\\\" | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]');
git commit -am "New prerelease $PACKAGE_VERSION"
git tag "${PACKAGE_VERSION}" -am "Version ${PACKAGE_VERSION}"
git push --tags
