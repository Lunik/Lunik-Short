var config = require('./config.json')
var Log = require('./log.js')
var fs = require('fs')

function BD () {
  this.table = {}
  this.reversTable = {}

  this.load()
}

BD.prototype.load = function () {
  if (!fs.existsSync(config.database.path)) {
    this.save()
  } else {
    this.table = JSON.parse(fs.readFileSync(config.database.path, 'utf8'))
    //init reversTable
    for(key in this.table){
      this.reversTable[this.table[key]] = key
    }
  }
}

BD.prototype.save = function () {
  fs.writeFile(config.database.path, JSON.stringify(this.table), function (err) {
    if (err) Log.print(err)
  })
}

BD.prototype.add = function (key, value) {
  this.table[key] = value
  this.reversTable[value] = key
  this.save()
}

BD.prototype.getUrl = function (hash) {
  var url = this.table[hash]
  if(url){
    return url
  } else {
    return -1
  }
}

BD.prototype.getHash = function (url) {
  var hash = this.reversTable[url]
  if(hash){
    return hash
  } else {
    return -1
  }
}

module.exports = new BD()
