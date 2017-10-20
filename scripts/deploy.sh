#!/bin/sh -xe

# Setup git
git config --global user.name "ichefbot"
git config --global user.email "developer@ichef.com.tw"
git remote add origin-pages "https://${GH_TOKEN}@${GH_REPO}" > /dev/null 2>&1

yarn release --git-remote origin-pages
yarn ghpages
