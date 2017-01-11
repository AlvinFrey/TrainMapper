# TrainMapper

![TGV](http://www.interrail.eu/sites/interrail.eu/files/styles/asset_image_images_slider_big/public/tgv_high-spped_train_france.jpg?itok=P3JOlL6C "TGV" )

## Faire fonctionner le projet

Sur Linux, nous avons mis en place un script (startup.sh) qui permet d'installer automatiquement les logiciels et récupérer automatiquement le projet, pour le lancer il faut faire cette commande : 

``` 
$ sh startup.sh
```

Sur Windows il vous suffit de télécharger les logiciels [NodeJS] et [Git] et cloner le projet venant de Github, ensuite il faut vous rendre dans le dossier du projet via un terminal et taper la commande :

``` 
$ npm install pm2@latest -g 
$ npm install 
$ pm2 startup
```

Une fois que le projet est téléchargé pour le lancer vous vous rendez avec un terminal dans le dossier et vous lancer le projet à l'aide de cette commande :

``` 
$ pm2 start index.js
```

## License

Ce programme est distribué sous license Creative Commons CC-BY-NC-SA-4.0 cela signifie que vous pouvez partager et adapter ce code mais il n'est pas possible d'en faire utilisation commerciale

[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](http://creativecommons.org/licenses/by-nc-sa/4.0/)

## Technologies Utilisés

* [NodeJS] - programmation Javascript côté serveur
* [NPM] - Système de gestion de paquet Javascript
* [Socket IO] - système d'envoi de données à travers des sockets
* [Express] - système permettant de mettre en place une infrastructure web sous Node.js


## Contributeurs

* [Alvin FREY]
* [Valentin FRITZ]
* Valentin TAHON
* Loïc DEVERRE
* Dorian PARRENT

[//]: #

   [NodeJS]: <https://nodejs.org/dist/v6.9.4/node-v6.9.4-x86.msi>
   [Git]: <https://git-scm.com/downloads>
   [NPM]: <npmjs.com>
   [Socket IO]: <socket.io>
   [Express]: <expressjs.com/fr/>

   [Alvin FREY]: <https://twitter.com/Frey_Alvin>
   [Valentin FRITZ]: <https://github.com/vfrz>