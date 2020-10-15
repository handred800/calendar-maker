#!/usr/bin/env sh

# 發生錯誤時中止
set -e

# build
npm run build

# into dist folder 
cd dist

git init
git add -A
git commit -m 'deploy'

# 部署到 https://<USERNAME>.github.io/<REPO> 
git push -f https://github.com/handred800/calendar-maker.git master:gh-pages

cd -