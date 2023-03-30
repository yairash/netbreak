#!/bin/bash

# Run npm build
npm run build

# Remove test directory if it exists, create a new one and move build extension there
if [ -d "test" ]; then
  rm -r test/
fi
mkdir test
mv singlefile-extension-* test/

# Unzip the extension and remove the zip file
cd test/
unzip singlefile-extension-chromium.zip
rm singlefile-extension-*.zip

# Copy manifest file to test directory
cp ../manifest.json .

