#!/bin/sh -xe

# Clear and re-create the deploy directory
rm -rf deploy || exit 0

# Only deploy storybook from master branch
if [ "$GIT_BRANCH" = "origin/master" ]; then
    # Git clone
    git clone -b gh-pages --single-branch git@github.com:iCHEF/gypcrete.git deploy

    # Clean up files from last build(except .git)
    find ./deploy/* ! -path "./deploy/.git/*" ! -name ".git" | xargs rm -rf

    # Copy public files
    cp -R ./public/. ./deploy

    # Commit and push
    cd deploy
    git add .
    git commit -m "Built at ${BUILD_TAG}" --author="ichefbot <developer@ichef.com.tw>"
    git push origin gh-pages
fi
