#!/bin/bash

# Exit on error (e.g. when `hexo generate` fails)
set -e

rsync -aqv --exclude='.git' --exclude='build' . build

cd build

hexo generate

git init
git add .
git commit -m 'deploy'
git remote add origin git@heroku.com:timgthomas.git
git push origin master --force

cd ..
rm -rf build
