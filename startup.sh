#!/usr/bin/bash

apt-get install -y nodejs-legacy nodejs npm git
git clone "https://github.com/AlvinFrey/TrainMapper.git"
cd TrainMapper
npm install pm2@latest -g && npm install && pm2 startup