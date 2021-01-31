
# Bump all versions
npm version prerelease --no-git-tag-version
npm version prerelease --no-git-tag-version --prefix ./frameworks/html
npm version prerelease --no-git-tag-version --prefix ./frameworks/react
npm version prerelease --no-git-tag-version --prefix ./frameworks/angular
npm version prerelease --no-git-tag-version --prefix ./frameworks/angular/projects/cloudinary-library

# Build all libraries
npm run build --prefix ./frameworks/html
npm run build --prefix ./frameworks/react
npm run build --prefix ./frameworks/angular

# Release all libraries
(cd ./frameworks/html/dist && npm publish --access public)
(cd ./frameworks/react/dist && npm publish --access public)
(cd ./frameworks/angular/dist/cloudinary-library && npm publish --access public)


# Add all new package.json's changes to git
PACKAGE_VERSION=$(cat package.json | grep \\\"version\\\" | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]');
git commit -am "New prerelease $PACKAGE_VERSION"
git tag "${PACKAGE_VERSION}" -am "Version ${PACKAGE_VERSION}"
git push --tags
