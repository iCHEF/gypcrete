#!/bin/sh -xe

# Clear and re-create the deploy directory
rm -rf deploy || exit 0

# Screenshot master branch with release tag
if [ "$GIT_BRANCH" = "origin/master" ]; then
    export PACKAGE_VERSION=$(node -p -e "require('./package.json').version")
    git tag -a "${PACKAGE_VERSION}" -m "Deployed with ${BUILD_TAG}"
    git push --tag --force origin || exit 1
fi

# Git clone
git clone -b dist --single-branch git@github.com:iCHEF/gypcrete.git deploy

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
git add .
git commit -m "Built at ${BUILD_TAG}" --author="ichefbot <developer@ichef.com.tw>"

# Push to dist branch
git push origin dist
