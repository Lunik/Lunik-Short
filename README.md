# Lunik-Short
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/) [![express](https://img.shields.io/badge/express-v4.13.3%20-green.svg?style=flat-square)](http://expressjs.com/)   

## ===== Installation =====

## Npm
    $ npm install lunik-short
##### Exemple
    require('lunik-short')

## Git
    $ git clone https://github.com/Lunik/Lunik-Short.git
    $ cd Lunik-Short
    $ npm install
    $ nano src/config.json
##### Run
    $ npm start

## ===== View =====
![Nodejs-Short](http://puu.sh/mKcXZ/6cc58d830f.png)

## ===== API =====

    POST http://<YOUR_DOMAIN>/api

### Parameters

|Name	| Type	| Description |
|:----|:------|:------------|
|type |string |Specify the type of request (new, getUrl, getHash)|
|url  |string |Url to short|
|hash |string |Hash of the shorten url|
