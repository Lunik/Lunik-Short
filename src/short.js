var Short = String

Short.prototype.hash = function(){
  var hash = 0, i, chr
  if (this.length == 0) return hash
  for (var i = 0; i < this.length; i++) {
    hash = ((hash << 5) - hash) + this.charCodeAt(i)
    hash |= 0
  }
  hash = Math.abs(hash)
  hash = hash.toString(36)
  return hash
}

Short.prototype.validURL = function () {
  var pattern = new RegExp(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/) // fragment locator
  return pattern.test(this)
}
