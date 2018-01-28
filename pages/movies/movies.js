var util = require('../../utils/util.js')
var app = getApp()

Page({
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {}
  },
  onLoad: function (options) {
    var inTheatersUrl  = `${app.globalData.doubanBase}/v2/movie/in_theaters?start=0&count=3`
    var comingSoon = `${app.globalData.doubanBase}/v2/movie/coming_soon?start=0&count=3`
    var top250Url = `${app.globalData.doubanBase}/v2/movie/top250?start=0&count=3`

    this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映")
    this.getMovieListData(comingSoon, "comingSoon", "即将上映")
    this.getMovieListData(top250Url, "top250", "豆瓣Top250")
  },
  getMovieListData: function(url, settedKey, categoryTitle) {
    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'Content-Type': 'json'
      },
      success: function(res) {
        // console.log(res)
        that.processDouBanData(res.data, settedKey, categoryTitle)
      },
      fail: function(error) {
        console.log(error)
      }
    })
  },
  processDouBanData: function (moviesDouBan, settedKey, categoryTitle) {
    var movies = []
    for(var idx in moviesDouBan.subjects) {
      // console.log(moviesDouBan.subjects)
      var subject = moviesDouBan.subjects[idx]
      var title = subject.title
      if(title.length >= 6) {
        title = title.substring(0, 6) + "..."
      }

      var temp = {
        stars: util.convertToStarArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }
    var readyData = {}
    readyData[settedKey] = {
      categoryTitle,
      movies
    }
    this.setData(readyData)
  },
  onMoreTap: function(event) {
    var category = event.currentTarget.dataset.category
    wx.navigateTo({
      url: 'more-movie/more-movie?category=' + category
    })
  }
})