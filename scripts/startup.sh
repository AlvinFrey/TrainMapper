#!/usr/bin/bash

SUDO=''
if (( $EUID != 0 )); then
    SUDO='sudo'
fi
$SUDO curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
$SUDO apt-get install -y nodejs
$SUDO apt-get install -y nodejs-legacy npm git
$SUDO git clone "https://github.com/AlvinFrey/TrainMapper.git"
cd TrainMapper
$SUDO npm install pm2@latest -g && npm install && pm2 startup