#!/bin/bash

yes [answer] | ./build-extension.sh

unzip singlefile-extension-chromium.zip -d test/

cp manifest.json test/
