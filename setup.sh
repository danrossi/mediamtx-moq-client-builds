#!/bin/sh

git clone -b moq-js-modules https://github.com/danrossi/mediamtx.git
cd mediamtx
git remote add upstream https://github.com/bluenviron/mediamtx.git
git fetch --tags upstream
git pull
npm install