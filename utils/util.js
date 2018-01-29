function convertToStarArray(stars) {
  var num = stars.toString().substring(0, 1)
  var array = []
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1)
    }
    else {
      array.push(0)
    }
  }
  return array
}
function http(url,callBack) {
  var that = this;
  wx.request({
    url: url,
    method: 'GET',
    header: {
      'Content-Type': 'json'
    },
    success: function (res) {
      callBack(res.data)
    },
    fail: function (error) {
      console.log(error)
    }
  })
}

function convertToCastString(casts) {
  var castjoin = ''
  for (var idx in casts) {
    castjoin = castjoin + casts[idx].name + '/'
  }
  return castjoin.substring(0, castjoin.length-2)
}

function convertToCastInfos(casts) {
  var castsArray = []
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatar?casts[idx].avatars.large: '',
      name: casts[idx].name
    }
    castsArray.push(cast)
  }
  return castsArray
}

module.exports = {
  convertToStarArray,
  http,
  convertToCastString,
  convertToCastInfos
}