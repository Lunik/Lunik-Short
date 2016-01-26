var Log = require('./log.js')
var config = require('./config.json')
var Short = require('./short.js')
var BD = require('./bd.js')
var API = require('./api.js')

var express = require('express')
var http = require('http')
var bodyParser = require('body-parser')
var fs = require('fs')

function Server () {
  this.app = express()
  this.app.use(express.static(__dirname + '/public'))
  this.app.use(bodyParser.json())
  this.app.use(bodyParser.urlencoded({ extended: true }))

  this.server = http.createServer(this.app)
  this.server.listen(config.server.port, function () {
    Log.print('Server listening at port ' + config.server.port)
  })

  this.app.post('/new', function (req, res) {
    var url = req.body.url
    var hash = url.hash()
    BD.add(hash, url)
    res.end(JSON.stringify({url: config.server.url + hash}))
  })

  this.app.post('/api', function (req, res) {
    API.query(req, res)
  })

  this.app.get('/*', function (req, res) {
    var hash = req.params[0]
    var url = BD.getUrl(hash)
    if (url) {
      res.redirect(url)
    } else {
      fs.readFile(__dirname + '/public/index.html', function (err, data) {
        if (err) Log.print(err)
        res.end(data)
      })
    }
  })
}

module.exports = new Server()
