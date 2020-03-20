#!/bin/bash

echo "Publishing ${TRAVIS_TAG}"

# convert lightweight tag to annotated tag so Lerna can use it
git tag -a -f -m "${TRAVIS_TAG}" "${TRAVIS_TAG}" "${TRAVIS_TAG}"

# push back tags
git remote add tags-origin "https://ichefbot:${GH_TOKEN}@${GH_REPO}"
git push --force tags-origin "${TRAVIS_TAG}"
git remote remove tags-origin

# publish to npm
yarn release --yes --ignore-prepublish
