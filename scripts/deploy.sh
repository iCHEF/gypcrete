#!/bin/bash

echo "Publishing ${TRAVIS_TAG}"

# convert lightweight tag to annotated tag so Lerna can use it
git tag -a -f -m "${TRAVIS_TAG}" "${TRAVIS_TAG}" "${TRAVIS_TAG}"
git push --force origin "${TRAVIS_TAG}"

# publish to npm
yarn release --ignore-prepublish
