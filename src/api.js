var BD = require('./bd.js')
var config = require('./config.json')

function API () {
}

API.prototype.query = function (req, res) {
  switch (req.body.type) {
    case 'new':
      if (req.body.url) {
        res.end(JSON.stringify({
          url: req.body.url,
          short: this.new(req.body.url)
        }))
      } else {
        res.end(JSON.stringify({
          err: 'No url specified.'
        }))
      }
      break

    case 'getHash':
      if (req.body.url) {
        var hash = this.getHash(req.body.url)
        if (hash !== -1) {
          res.end(hash)
        } else {
          res.end(JSON.stringify({
            err: 'No hash for this url.'
          }))
        }
      } else {
        res.end(JSON.stringify({
          err: 'No url specified.'
        }))
      }
      break

    case 'getUrl':
      if (req.body.hash) {
        var url = this.getUrl(req.body.hash)
        if (url !== -1) {
          res.end(url)
        } else {
          res.end(JSON.stringify({
            err: 'No url for this hash.'
          }))
        }
      } else {
        res.end(JSON.stringify({
          err: 'No hash specified.'
        }))
      }
      break
    default:
    res.end(JSON.stringify({
      err: 'Wrong type.'
    }))
  }
}

API.prototype.new = function (url) {
  var hash = url.hash()
  BD.add(hash, url)
  return config.server.url + hash
}

API.prototype.getHash = function (url) {
  return BD.getHash(url)
}

API.prototype.getUrl = function (hash) {
  return BD.getUrl(hash)
}

module.exports = new API()

/*
switch (req.body.type) {
  case "new":
    if(req.body.url){
      var url = req.body.url
      var hash = url.hash()
      BD.add(hash, url)
      res.end(JSON.stringify({
        url: url,
        short:config.server.url + hash
      })
    } else {
      res.end(JSON.stringify({
        err:"No url specified."
      }))
    }
    break
  case "getHash":
    if(req.body.url){
      var url = req.body.url
      BD.get(url)
      res.end(config.server.url + hash)
    } else {
      res.end(JSON.stringify({
        err:"No url specified."
      }))
    }
    break
  case "getUrl":
    if(req.body.hash){
      var url = req.body.url
      BD.get(url)
      res.end(config.server.url + hash)
    } else {
      res.end(JSON.stringify({
        err:"No url specified."
      }))
    }
    break
  case "stats":
    if(req.body.hash){
    } else {
      res.end("Bad hash.")
    }
    break
  default:

}
*/
