#!/bin/bash
DOCKER_IMAGE=superlogical/nodejs-wod:$TRAVIS_BUILD_NUMBER

echo "TRAVIS_BUILD_NUMBER ---> $TRAVIS_BUILD_NUMBER"

docker build -t $DOCKER_IMAGE .
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker push $DOCKER_IMAGE