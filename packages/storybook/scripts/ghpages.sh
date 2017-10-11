#!/bin/sh -xe

# Clear and re-create the deploy directory
rm -rf deploy || exit 0

# Only deploy storybook from master branch
if [ "$TRAVIS_BRANCH" = "master" ]; then
    # Setup git
    git config --global user.name "ichefbot"
    git config --global user.email "developer@ichef.com.tw"

    # Git clone
    git clone -b gh-pages --single-branch "https://${GH_REPO}" deploy

    # Clean up files from last build(except .git)
    find ./deploy/* ! -path "./deploy/.git/*" ! -name ".git" | xargs rm -rf

    # Copy public files
    cp -R ./public/. ./deploy

    # Commit files
    cd deploy
    git add -A .
    git commit -m "Built at Travis-${TRAVIS_BUILD_NUMBER} (${TRAVIS_COMMIT_RANGE})"

    # Push to gh-pages
    git remote add origin-pages "https://${GH_TOKEN}@${GH_REPO}" > /dev/null 2>&1
    git push --set-upstream origin-pages gh-pages
fi
