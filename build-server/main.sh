#!/bin/bash
export GIT_REPOSITORY_URL = "$GIT_REPOSITORY_URL"

#out code will be available in output directory of docker
git clone "$GIT_REPOSITORY_URL" /home/app/output

exec node script.js