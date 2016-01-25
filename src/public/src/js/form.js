$('.form input[name=generate]').click(function () {
  postForm()
})

$('.form input[name=regenerate]').click(function () {
  window.location.reload()
})

function postForm () {
  var url = $('.form input[name=url]').val()
  if(url){
    $.post('/new?', {url: url}, function (data) {
      data = JSON.parse(data)
      if(data.err){
        $('.form input[name=url]').css('color', 'red')
      } else {
        afficheUrl(data.url)
      }
    })
  }
}

function afficheUrl (url) {
  $('.form input[name=url]').val(url).attr('data-url', url).select()
  $('.form input[name=generate]').hide()
  $('.form input[name=regenerate]').show()
}
