#!/bin/bash

echo "Making a new build of Megafront"
npm run build BACKEND_HOST=${MEGA_BACKEND_HOST} --prefix /megafront/
echo "Serving the build"
serve -s /megafront/build/ -p 5000

exit 0