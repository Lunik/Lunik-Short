var config = require('./config.json')
var Log = require('./log.js')
var fs = require('fs')

function BD () {
  this.table = {}

  this.load()
}

BD.prototype.load = function () {
  if (!fs.existsSync(config.database.path)) {
    this.save()
  } else {
    this.table = JSON.parse(fs.readFileSync(config.database.path, 'utf8'))
  }
}

BD.prototype.save = function () {
  fs.writeFile(config.database.path, JSON.stringify(this.table), function (err) {
    if (err) Log.print(err)
  })
}

BD.prototype.add = function (key, value) {
  this.table[key] = value
  this.save()
}

BD.prototype.getUrl = function (hash) {
  return this.table[hash]
}

BD.prototype.getHash = function (url) {
  //return this.table[key]
}

module.exports = new BD()
