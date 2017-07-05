#!/bin/sh -xe

# Clear and re-create the deploy directory
rm -rf deploy || exit 0

# Setup git
git config --global user.name "ichefbot"
git config --global user.email "developer@ichef.com.tw"

# Screenshot master branch with release tag
if [ "$TRAVIS_BRANCH" = "master" ]; then
    export PACKAGE_VERSION=$(node -p -e "require('./package.json').version")
    git tag -a "${PACKAGE_VERSION}" -m "Deployed with ${BUILD_TAG}"

    # Push new tag
    git remote add origin-pages "https://${GH_TOKEN}@${GH_REPO}" > /dev/null 2>&1
    git push --tag --force origin-pages || exit 1
fi

# Git clone
git clone -b dist --single-branch "https://${GH_REPO}" deploy

# Clean up files from last build
rm -rf ./deploy/dist ./deploy/lib ./deploy/es5

# Copy built files
cp -R ./dist ./deploy/dist
cp -R ./lib ./deploy/lib
cp -R ./es5 ./deploy/es5
cp ./README.md ./deploy/README.md
cp ./package.json ./deploy/package.json

# Commit built files
cd deploy
git add -A .
git commit -m "Built at Travis-${TRAVIS_BUILD_NUMBER} (${TRAVIS_COMMIT_RANGE})"

# Push to dist branch
git remote add origin-pages "https://${GH_TOKEN}@${GH_REPO}" > /dev/null 2>&1
git push --set-upstream origin-pages dist

# Publish to npm (only in master)
if [ "$TRAVIS_BRANCH" = "master" ]; then
    echo "Deploying v${PACKAGE_VERSION} to npm..."
    echo "//registry.npmjs.org/:_authToken=\${NPM_TOKEN}" > "${TRAVIS_BUILD_DIR}"/deploy/.npmrc

    npm publish || exit 1
fi
